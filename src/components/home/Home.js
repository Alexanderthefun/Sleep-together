import { useEffect, useState } from "react"
import "./home.css"

export const HomePage = () => {
    const [user1, setUser1] = useState([])

    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)


    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${sleeperUserObject.id}&_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference&_expand=snore&_expand=image`)
        .then(res => res.json())
        .then((res) => {
            setUser1(res[0])
        })
    }, [])

    return <div>
        <div className="userStuff">
        <h1 className="userHomeName">{user1.fullName}</h1>
            <img src={user1.image} className="user1Image"/>
        </div>
    </div>
}