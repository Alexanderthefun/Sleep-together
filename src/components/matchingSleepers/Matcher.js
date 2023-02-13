import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { bedtimeMatch } from "./bedtime"
import { genderMatch } from "./genders"
import { mattressTypeMatch } from "./mattressType"
import { sleepDepthMatch } from "./sleepDepth"
import { sleepNoiseMatch } from "./sleepNoise"
import { sleepPositionMatch } from "./sleepPosition"
import { tempMatch } from "./temperatures"
import { wakingTimeMatch } from "./wakingTime"
import "./Matcher.css"
import { snoreMatch } from "./snore"


export const MatchMaker = () => {
    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState([])
    const [user1, setUser1] = useState({})
    const [matches, setMatches] = useState([])
    const [existingMatches, setExisting] = useState([])
    const [isDeletingMatch, setIsDeletingMatch] = useState(false)
    const [renderMatches, startRenderMatches] = useState(false)
    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)

    useEffect(() => {
        const fetchUser1 = fetch(`http://localhost:8088/users?id=${sleeperUserObject.id}&_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference&_expand=snore`)
            .then(res => {
                return res.json()
            })

        const fetchAllUsers = fetch('http://localhost:8088/users?_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference&_expand=snore')
            .then(res => res.json())

        const fetchExistingMatches = fetch(`http://localhost:8088/matches?_expand=user&user1Id=${sleeperUserObject.id}`)
            .then(res => res.json())

        Promise.all([fetchExistingMatches, fetchAllUsers, fetchUser1]).then((res) => {
            setExisting(res[0])
            setAllUsers(res[1])
            setUser1(res[2][0])
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
        candidatesArr.push(snoreMatch(user1, allUsers))

        const candidates = [].concat(...candidatesArr)
        const count = {}
        const trueMatches = []
        const userCounts = new Map()

        for (const person of candidates) {
            if (!userCounts.has(person.id)) {
                userCounts.set(person.id, 1)
            } else {
                userCounts.set(person.id, userCounts.get(person.id) + 1)
            }
            const hasFour = userCounts.get(person.id) >= 5
            const isGenderMatched = genderMatches.some(obj => obj.id === person.id)
            const dontExistYet = !trueMatches.some(obj => obj.id === person.id)
            const notMe = person.id !== user1.id
            if (hasFour && isGenderMatched && dontExistYet && notMe) {
                trueMatches.push(person)
                
            }
        }
       
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
            .then(() => {
                fetch(`http://localhost:8088/matches?_expand=user&user1Id=${sleeperUserObject.id}`)
                    .then(res => res.json())
                    .then(res => {
                        setExisting(res)
                    })
            })
    }, [matches])
    const deleteMatch = (e, f) => {
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
                <h2 className="userName">{user1.fullName}</h2>
                <img className="userImage" src={user1.image} />
                <ul className="u1PrefList">
                    <li>{user1?.city}, {user1?.state}</li>
                    <li>{user1?.genderMatchPreference?.type}</li>
                    <li>{user1?.bedTime?.timeFrame}</li>
                    <li>{user1?.wakingTime?.range}</li>
                    <li>{user1?.sleepDepth?.type}</li>
                    <li>{user1?.sleepNoise?.type}</li>
                    <li>{user1?.mattressType?.type}</li>
                    <li>{user1?.temperature?.range}</li>
                    <li>{user1?.sleepPosition?.type}</li>
                    <li>{user1?.snore?.preference}</li>


                </ul>
            </div>
            <div className="matches">
                {existingMatches.map(
                    (match) => {
                        let foundPerson = matches.find(person => person.id === match.userId)
                        if (match.active) {
                            return <div className="individuals" key={match.id}><h2 className="matchName">{match?.user?.fullName} </h2>
                                <img className="matchImage .hover-zoom" src={match?.user?.image} />
                                <ul className="matchPrefList">
                                <li>{foundPerson?.city}, {foundPerson?.state}</li>    
                                <li>{foundPerson?.genderMatchPreference?.type}</li>
                                <li>{foundPerson?.bedTime?.timeFrame}</li>
                                <li>{foundPerson?.wakingTime?.range}</li>
                                <li>{foundPerson?.sleepDepth?.type}</li>
                                <li>{foundPerson?.sleepNoise?.type}</li>
                                <li>{foundPerson?.mattressType?.type}</li>
                                <li>{foundPerson?.temperature?.range}</li>
                                <li>{foundPerson?.sleepPosition?.type}</li>
                                <li>{foundPerson?.snore?.preference}</li>
                                </ul>
                                <button
                                    onClick={(clickEvent) => deleteMatch(match.id, match.userId)}
                                    type="delete" className="deleteMatchButton"
                                > Delete Match

                                </button>

                            </div>
                        }
                    }
                )}
            </div>
            <div></div>
        </div>

    )


}






