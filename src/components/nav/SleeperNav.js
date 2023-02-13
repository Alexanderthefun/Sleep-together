import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const SleeperNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/mymatches">Matches</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Edit Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/" onClick={() => navigate("/")}>Home</Link>
            </li>
            {
                localStorage.getItem("sleeper_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("sleeper_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}