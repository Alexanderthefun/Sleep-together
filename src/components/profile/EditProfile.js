import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EditProfile = () => {
    const [active, setActive] = useState(true)
    const [genderMatchPreferences, setGenderMatchPreferences] = useState([])
    const [sleepPositions, setSleepPositions] = useState([])
    const [sleepDepths, setSleepDepths] = useState([])
    const [mattressTypes, setMattressTypes] = useState([])
    const [bedTimes, setBedTimes] = useState([])
    const [temperatures, setTemperatures] = useState([])
    const [wakingTimes, setWakingTimes] = useState([])
    const [sleepNoises, setSleepNoises] = useState([])
    const [user, setUser] = useState([])
    const [error, setError] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [profile, updateProfile] = useState({
        fullName: user.fullName,
        email: '',
        accountActive: '',
        genderMatchPreferenceId: '',
        sleepPositionId: '',
        sleepDepthId: '',
        mattressTypeId: '',
        bedTimeId: '',
        temperatureId: '',
        wakingTimeId: '',
        sleepNoiseId: '',
        accountActive: true
    })
    useEffect(() => {
        Promise.all([fetch('http://localhost:8088/users?accountActive'), fetch('http://localhost:8088/genderMatchPreferences'),
        fetch('http://localhost:8088/sleepPositions'), fetch('http://localhost:8088/sleepDepths'),
        fetch('http://localhost:8088/mattressTypes'), fetch('http://localhost:8088/bedTimes'),
        fetch('http://localhost:8088/temperatures'), fetch('http://localhost:8088/wakingTimes'),
        fetch('http://localhost:8088/sleepNoises'), fetch(`http://localhost:8088/users?id=${sleeperUserObject.id}`)
        ])
            .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json()]))
            .then(([data1, data2, data3, data4, data5, data6, data7, data8, data9, data10]) => {
                setActive(data1)
                setGenderMatchPreferences(data2)
                setSleepPositions(data3)
                setSleepDepths(data4)
                setMattressTypes(data5)
                setBedTimes(data6)
                setTemperatures(data7)
                setWakingTimes(data8)
                setSleepNoises(data9)
                setUser(data10[0])
            })
            .catch(error => {
                setError(error)
            })
    }, [])



    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)


    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])


    let navigate = useNavigate()

    const finishEdit = () => {
        if (
            profile.fullName && profile.email &&
            profile.sleepNoiseId && profile.genderMatchPreferenceId &&
            profile.sleepPositionId && profile.sleepDepthId &&
            profile.mattressTypeId && profile.temperatureId &&
            profile.bedTimeId && profile.wakingTimeId 
        ) {
            return fetch(`http://localhost:8088/users/${sleeperUserObject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
                .then(res => res.json())
                .then(navigate("/"))
        }
        else {
            window.alert("You must fill out the entire form in order to complete edit.")
        }
    }

    const handleEdit = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${profile.email}`)
            .then(res => res.json())
            .then(res => {
                finishEdit(res)
            })
    }

    const deleteAccount = (e) => {
        if (window.confirm('Are You sure you want to delete your account?')){
            setIsDeleting(true)
            return fetch(`http://localhost:8088/users/${sleeperUserObject.id}`, {
                method: "DELETE",
            })
                .then(navigate("/login"))
        }
        else (setIsDeleting(false))
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleEdit}>
                <h2 className="h3 mb-3 font-weight-normal">Complete Entire Form to Edit Profile</h2>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.fullName = event.target.value
                            updateProfile(copy)
                        }
                    }
                        type="text" value={profile.fullName} id="fullName" className="form-control"
                        placeholder={user.fullName} required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.email = event.target.value
                            updateProfile(copy)
                        }
                    }
                        type="email" id="email" className="form-control"
                        placeholder={user.email} required />
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.genderMatchPreferenceId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Gender Match Preference</option>
                            {genderMatchPreferences.map(
                                (gender) => {
                                    return <option
                                        key={gender.id}
                                        value={gender.id}>
                                        {gender.type}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.sleepPositionId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Sleep Position</option>
                            {sleepPositions.map(
                                (position) => {
                                    return <option
                                        key={position.id}
                                        id={position.id}
                                        value={position.id}>
                                        {position.type}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.sleepDepthId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Sleep Depth</option>
                            {sleepDepths.map(
                                (depth) => {
                                    return <option
                                        key={depth.id}
                                        value={depth.id}>
                                        {depth.type}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.mattressTypeId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Mattress Type</option>
                            {mattressTypes.map(
                                (type) => {
                                    return <option
                                        key={type.id}
                                        value={type.id}>
                                        {type.type}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.bedTimeId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Bedtime</option>
                            {bedTimes.map(
                                (bedtime) => {
                                    return <option
                                        key={bedtime.id}
                                        value={bedtime.id}>
                                        {bedtime.timeFrame}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.wakingTimeId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Waking Time</option>
                            {wakingTimes.map(
                                (wakingTime) => {
                                    return <option
                                        key={wakingTime.id}
                                        value={wakingTime.id}>
                                        {wakingTime.range}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.temperatureId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Temperature</option>
                            {temperatures.map(
                                (temp) => {
                                    return <option
                                        key={temp.id}
                                        value={temp.id}>
                                        {temp.range}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="dropDowns"
                            onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.sleepNoiseId = parseInt(event.target.value)
                                    updateProfile(copy)
                                }
                            }>
                            <option value="0">Sleep Noise</option>
                            {sleepNoises.map(
                                (noise) => {
                                    return <option
                                        key={noise.id}
                                        value={noise.id}>
                                        {noise.type}</option>
                                }
                            )}
                        </select>
                    </div>
                </fieldset>

                <button
                    onClick={(clickEvent) => handleEdit(clickEvent)}
                    type="submit" className="button"> Submit Changes
                </button>
                <button
                    onClick={(clickEvent) => deleteAccount(clickEvent)}
                    type="delete" id="deleteButton"> Delete Account

                </button>

            </form>
        </main>
    )
}