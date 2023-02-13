import { useState } from "react"
import { EditProfile } from "./EditProfile"
import { Locations } from "./LocationDropDowns"
import "./profile.css"

export const EditContainer = () => {
    const [profile, updateProfile] = useState({
        state: '',
        city: ''
    })

    return <>
    <EditProfile profileState={profile}/>
    <Locations setterFunction={updateProfile}/>
    </>
}