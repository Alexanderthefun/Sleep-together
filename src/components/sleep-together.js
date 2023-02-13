import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./sleep-together.css"
import { MatchContainer } from "./auth/Container"



export const SleepTogether = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<MatchContainer />} />
		
		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}