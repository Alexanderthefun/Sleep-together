import { useState } from "react"
import { Locations } from "./LocationDropDowns"
import { Register } from "./Register"
import "./Login.css"

export const MatchContainer = () => {
    const [profile, updateProfile] = useState({
        state: '',
        city: ''
    })

    return <div id="entireForm">
        <h1 id="pleaseRegister" className="pleaseRegister">Please Register for Sleep Together</h1>
        <div id="parentContainer">
        <Locations setterFunction={updateProfile} />
        <Register profileState={profile} />
        </div>
    </div>
}