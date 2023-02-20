import { useState } from "react"
import { EditProfile } from "./EditProfile"
import { Locations } from "./LocationDropDowns"
import "./profile.css"

export const EditContainer = () => {
    const [profile, updateProfile] = useState({
        fullName: '',
        email: '',
        state: '',
        city: ''
    })

    return <>
    <div className="entireForm1">
    <h2 className="h3 mb-3 font-weight-normal">Complete Entire Form to Edit Profile</h2>
        <h3 className="basicInfo">Basic Info</h3>
    <Locations setterFunction={updateProfile}/>
    <h3 className="sleepPrefs">Sleep Preferences</h3>
    <EditProfile profileState={profile}/>
    </div>
    </>
}