import { useEffect, useState } from "react"

export const SleeperForm = () => {
    const [profile, updateProfile] = useState({
        fullName: '',
        email: '',
        gender: '',
        genderMatchPreference: '',
        sleepPosition: '',
        sleepDepth: '',
        mattressType: '',
        bedTime: '',
        temperature: '',
        wakingTime: '',
        sleepNoise: ''
    })
    const [genders, setGenders] = useState(null)
    const [genderMatchPreferences, setGenderMatchPreferences] = useState(null)
    const [sleepPositions, setSleepPositions] = useState(null)
    const [sleepDepths, setSleepDepths] = useState(null)
    const [mattressTypes, setMattressTypes] = useState(null)
    const [bedTimes, setBedTimes] = useState(null)
    const [temperatures, setTemperatures] = useState(null)
    const [wakingTimes, setWakingTimes] = useState(null)
    const [sleepNoises, setSleepNoises] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        Promise.all([fetch('http://localhost:8088/genders'), fetch('http://localhost:8088/genderMatchPreferences'),
        fetch('http://localhost:8088/sleepPositions'), fetch('http://localhost:8088/sleepPositions'),
        fetch('http://localhost:8088/sleepDepths'), fetch('http://localhost:8088/mattressTypes'),
        fetch('http://localhost:8088/bedTimes'), fetch('http://localhost:8088/temperatures'),
        fetch('http://localhost:8088/wakingTimes'), fetch('http://localhost:8088/sleepNoises')
        ])
            .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json(), res10.json()]))
            .then(([data1, data2, data3, data4, data5, data6, data7, data8, data9, data10]) => {
                setGenders(data1)
                setGenderMatchPreferences(data2)
                setSleepPositions(data3)
                setSleepDepths(data4)
                setMattressTypes(data5)
                setBedTimes(data6)
                setTemperatures(data7)
                setTemperatures(data8)
                setWakingTimes(data9)
                setSleepNoises(data10)
            })
            .catch(error => {
                setError(error)
            })
    }, [])

    if (error) {
        return <div>Error</div>
    }

    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users?userId=${sleeperUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                const sleeperObject = data[0]
                updateProfile(sleeperObject)
            })
    }, [])



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(() => {
                setFeedback("User Profile Update Successful!")
            })
            .then(() => {
                //Do Nothing
            })
    }

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile_title">Update Profile </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.name}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.name = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select className="dropDowns">
                        <option value="0">Select Gender</option>
                        {genders.map(
                            (gender) => {
                                return <option
                                    value={gender.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.gender = evt.target.value
                                            updateProfile(copy)
                                        }
                                    }>
                                    {gender.type}</option>
                            }
                        )}
                    </select>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select className="dropDowns">
                        <option value="0">Gender Match Preference</option>
                        {genderMatchPreferences.map(
                            (gender) => {
                                return <option
                                    value={gender.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.genderMatchPreference = evt.target.value
                                            updateProfile(copy)
                                        }
                                    }>
                                    {gender.type}</option>
                            }
                        )}
                    </select>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
        </form>
    </>)
}