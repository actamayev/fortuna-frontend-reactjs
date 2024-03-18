import { Routes, Route } from "react-router-dom"

import Missing from "./pages/missing"
import Login from "./pages/auth/login"
import Dashboard from "./pages/dashboard"
import Register from "./pages/auth/register"

export default function App() {

	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/register" element = {<Register />} />
			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
