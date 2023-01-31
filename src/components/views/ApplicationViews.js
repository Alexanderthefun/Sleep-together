import { SleeperViews } from "./SleeperViews"



export const ApplicationViews = () => {
    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)

    if (sleeperUserObject.staff) {
        return <></>
    }
    else { 
        return <SleeperViews />
    }
}