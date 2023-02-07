import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { bedtimeMatch } from "./bedtime"
import { genderMatch } from "./genders"
import { JSX } from "./JSX"
import { mattressTypeMatch } from "./mattressType"
import { sleepDepthMatch } from "./sleepDepth"
import { sleepNoiseMatch } from "./sleepNoise"
import { sleepPositionMatch } from "./sleepPosition"
import { tempMatch } from "./temperatures"
import { wakingTimeMatch } from "./wakingTime"
import "./Matcher.css"


export const MatchMaker = () => {
    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState([])
    const [user1, setUser1] = useState({})
    const [matches, setMatches] = useState([])
    const [existingMatches, setExisting] = useState([])
    const [isDeletingMatch, setIsDeletingMatch] = useState(false)
    const [pairsToSend, updatePairsToSend] = useState({
        user1Id: user1.id,
        user2Id: '',
        active: true
    })

    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)

    useEffect(() => {
        fetch('http://localhost:8088/users?_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference')
            .then(res => res.json())
            .then(res => {
                setAllUsers(res)
            })
    }, [])
    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${sleeperUserObject.id}&_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference`)
            .then(res => res.json())
            .then(res => {
                setUser1(res[0])
            })
    }, [])


    const doTheMath = () => {
        let candidatesArr = []
        const genderMatches = genderMatch(user1, allUsers)
        candidatesArr.push(bedtimeMatch(user1, allUsers))
        candidatesArr.push(wakingTimeMatch(user1, allUsers))
        candidatesArr.push(mattressTypeMatch(user1, allUsers))
        candidatesArr.push(sleepDepthMatch(user1, allUsers))
        candidatesArr.push(sleepNoiseMatch(user1, allUsers))
        candidatesArr.push(sleepPositionMatch(user1, allUsers))
        candidatesArr.push(tempMatch(user1, allUsers))

        const candidates = [].concat(...candidatesArr)
        const count = {}
        const trueMatches = []
        candidates.forEach(person => {
            if (!count[person]) {
                count[person] = 1;
            } else {
                count[person]++
            }
            if (count[person] >= 4 && genderMatches.includes(person) && !trueMatches.includes(person)) {
                trueMatches.push(person)
            }

        })
        setMatches(trueMatches)
    }
    //TRIGGER ALGORITHM 
    useEffect(() => {
        if (allUsers.length && Object.keys(user1).length) {
            doTheMath()
        }
    }, [allUsers, user1])

    //GET EXISTING MATCHES
    useEffect(() => {
        fetch(`http://localhost:8088/matches?_expand=user&user1Id=${sleeperUserObject.id}`)
            .then(res => res.json())
            .then(res => {
                setExisting(res)
            })
    }, [isDeletingMatch])


    //POSTING NEW MATCHES
    useEffect(() => {

        const promiseArr = matches.map(
            (match => {
                if (!existingMatches.find(existingMatch => existingMatch.userId === match.id && existingMatch.user1Id === user1.id)) {
                return (fetch(`http://localhost:8088/matches`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user1Id: user1.id,
                        userId: match.id,
                        active: true
                    })
                }))
            }
            })
        )
        Promise.all(promiseArr)
            .then()
    }, [existingMatches])

    // DELETING MATCHES (not gonna work until post works) is matches.id correct in the param?
    const deleteMatch = (e,f) => {
        if (window.confirm('Are You sure you want to delete this match?')) {
            setIsDeletingMatch(true)
            return fetch(`http://localhost:8088/matches/${e}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user1Id: user1.id,
                    userId: f,
                    active: false
                })
            })
                .then(navigate("/mymatches"))
        }
        else (setIsDeletingMatch(false))
    }


    return (
        <div className="matcherBody">

            <div className="user1">
                <h2>{user1.fullName}</h2>
                <ul className="u1PrefList">
                    <li>{user1?.genderMatchPreference?.type}</li>
                    <li>{user1?.bedTime?.timeFrame}</li>
                    <li>{user1?.wakingTime?.range}</li>
                    <li>{user1?.sleepDepth?.type}</li>
                    <li>{user1?.sleepNoise?.type}</li>
                    <li>{user1?.mattressType?.type}</li>
                    <li>{user1?.temperature?.range}</li>
                    <li>{user1?.sleepPosition?.type}</li>
                </ul>
            </div>
            <div className="matches">
                {existingMatches.map(
                    (match) => {
                        if (match.active){
                        return <div className="individuals" key={match?.user?.id}>{match?.user?.fullName} --
                            <button
                                onClick={(clickEvent) => deleteMatch(match.id, match.userId)}
                                type="delete" className="deleteMatchButton"
                                > Delete Match

                            </button>
                        </div>}
                    }
                )}
            </div>

        </div>
    )


}






