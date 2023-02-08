import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [profile, updateProfile] = useState({
        fullName: '',
        email: '',
        genderMatchPreferenceId: '',
        sleepPositionId: '',
        sleepDepthId: '',
        mattressTypeId: '',
        bedTimeId: '',
        temperatureId: '',
        wakingTimeId: '',
        sleepNoiseId: '',
        // image: null,
        accountActiveId: true
    })
    const [active, setActive] = useState(true)
    const [genderMatchPreferences, setGenderMatchPreferences] = useState([])
    const [sleepPositions, setSleepPositions] = useState([])
    const [sleepDepths, setSleepDepths] = useState([])
    const [mattressTypes, setMattressTypes] = useState([])
    const [bedTimes, setBedTimes] = useState([])
    const [temperatures, setTemperatures] = useState([])
    const [wakingTimes, setWakingTimes] = useState([])
    const [sleepNoises, setSleepNoises] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        Promise.all([fetch('http://localhost:8088/users?accountActive'), fetch('http://localhost:8088/genderMatchPreferences'),
        fetch('http://localhost:8088/sleepPositions'), fetch('http://localhost:8088/sleepDepths'),
        fetch('http://localhost:8088/mattressTypes'), fetch('http://localhost:8088/bedTimes'),
        fetch('http://localhost:8088/temperatures'), fetch('http://localhost:8088/wakingTimes'),
        fetch('http://localhost:8088/sleepNoises')
        ])
            .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json()]))
            .then(([data1, data2, data3, data4, data5, data6, data7, data8, data9]) => {
                setActive(data1)
                setGenderMatchPreferences(data2)
                setSleepPositions(data3)
                setSleepDepths(data4)
                setMattressTypes(data5)
                setBedTimes(data6)
                setTemperatures(data7)
                setWakingTimes(data8)
                setSleepNoises(data9)
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

    
    // const handleImageChange = (event) => {
    //     updateProfile({...profile, image: event.target.files[0]})
    // }

    // const data = new Blob([JSON.stringify({
    //     name: profile.fullName,
    //     email: profile.email,
    //     genderMatchPreferenceId: profile.genderMatchPreferenceId,
    //     sleepPositionId: profile.sleepPositionId,
    //     sleepDepthId: profile.sleepDepthId,
    //     mattressTypeId: profile.mattressTypeId,
    //     bedTimeId: profile.bedTimeId,
    //     temperatureId: profile.temperatureId,
    //     wakingTimeId: profile.wakingTimeId,
    //     sleepNoiseId: profile.sleepNoiseId,
    //     image: profile.image,
    // })], { type: 'application/json' })

    // (e) => {
                            //     const copy = {...profile}
                            //     copy.image = (e.target.files[0])
                            //     updateProfile(copy)
                            // }

    const registerNewUser = () => {
        if (
            profile.fullName && profile.email &&
            profile.sleepNoiseId && profile.genderMatchPreferenceId &&
            profile.sleepPositionId && profile.sleepDepthId &&
            profile.mattressTypeId && profile.temperatureId &&
            profile.bedTimeId && profile.wakingTimeId 
            // && profile.image
            
        ) {
            return fetch(`http://localhost:8088/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
                // body: data
            })
                .then(res => res.json())
                .then(createdUser => {
                    if (createdUser.hasOwnProperty("id")) {
                        localStorage.setItem("sleeper_user", JSON.stringify({
                            id: createdUser.id,
                            staff: createdUser.isStaff
                        }))

                        navigate("/")
                    }
                })
        }
        else {
            window.alert("You must fill out the entire form in order to register.")
        }
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${profile.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Sleep Together</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={
                                (event) => {
                                    const copy = { ...profile }
                                    copy.fullName = event.target.value
                                    updateProfile(copy)
                                }
                            }
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
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
                        placeholder="Email address" required />
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
                {/* <fieldset>
                    <div className="imgWrapper">
                        <label htmlFor="img">Upload Image </label>
                        <input 
                        type="file"
                        accept="image/*"
                        name="img"
                        className="imageInput"
                        onChange={handleImageChange}></input>

                        
                    </div>
                </fieldset> */}

                <button
                    onClick={(clickEvent) => handleRegister(clickEvent)}
                    type="submit" className="button"> Register </button>

            </form>
        </main>
    )
}


// figure out image upload.
// add sleep facts/ images to home page
