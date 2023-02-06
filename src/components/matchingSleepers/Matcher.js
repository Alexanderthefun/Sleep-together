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


export const MatchMaker = () => {
    const [allUsers, setAllUsers] = useState([])
    const [user1, setUser1] = useState({})
    const [matches, setMatches] = useState([])
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
            if(!count[person]) {
                count[person] = 1;
            } else {
                count[person]++
            }
            if (count[person] >= 4 && genderMatches.includes(person) && !trueMatches.includes(person) ) {
                trueMatches.push(person)
            }
            
        })
        setMatches(trueMatches)
    }



    useEffect(() => {
        if (allUsers.length && Object.keys(user1).length) {
            doTheMath()
        }
    }, [allUsers, user1])

    //make a condition that checks if the match exists or not.
    //if not, send user1.id and user2.id as well as active:true to the "matches" table in the database.
    //make a separate component that checks if match it active, if so displays the JSX for it.
    //write a button in the JSX that allows them to delete matches.
    useEffect(() => {

    })

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
            <div>
                {matches.map(
                    (match) => {
                        return <div>{match.fullName}</div>
                    }
                )}
            </div>

        </div>
    )


}






