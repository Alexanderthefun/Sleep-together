import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [sleeperUser, setSleeperUser] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
    const [genders, setGenders] = useState([])
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sleeperUser)
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
    useEffect(
        () => {
            fetch('http://localhost:8088/genders')
                .then(res => res.json())
                .then((genderArray) => {
                    setGenders(genderArray)
                })
        }, []
    )

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${sleeperUser.email}`)
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

    const updateSleeperUser = (evt) => {
        const copy = { ...sleeperUser }
        copy[evt.target.id] = evt.target.value
        setSleeperUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Sleep Together</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateSleeperUser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateSleeperUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
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
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = { ...sleeperUser }
                        copy.isStaff = evt.target.checked
                        setSleeperUser(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}


// how do I expand multiple tables? 
// is it smarter to use a promiseArray and then destructure it to variables? if so, how?
