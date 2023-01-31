import { SleeperNav } from "./SleeperNav"
import "./NavBar.css"

export const NavBar = () => {
    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)

    if (sleeperUserObject.staff) {
        return <></>
    }
    else { 
        return <SleeperNav />
    }
}