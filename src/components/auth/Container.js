import { useState } from "react"
import { Locations } from "./LocationDropDowns"
import { Register } from "./Register"

export const MatchContainer = () => {
    const [profile, updateProfile] = useState({
        state: '',
        city: ''
    })

    return <>
    <Register profileState={profile}/>
    <Locations setterFunction={updateProfile}/>
    </>
}