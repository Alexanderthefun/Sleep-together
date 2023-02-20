import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("sleeper_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff,
                        image: user.image
                        
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login" style={{ textAlign: "center" }}>
            <section>
                <form id="form--login" onSubmit={handleLogin}>
                    <h1>Sleep Together</h1>
                    <div>If you want to know how someone is doing, ask them how they're sleeping.</div>
                    <h2>Please sign in</h2>
                    
                    <fieldset className="loginField">
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                            <button type="submit" className="button">
                            Sign in
                        </button>
                    
                        
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

