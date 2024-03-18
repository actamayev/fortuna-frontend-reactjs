import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Missing from "./pages/missing"
import Login from "./pages/auth/login"
import Dashboard from "./pages/dashboard"
import Register from "./pages/auth/register"

import useGetAuthDataFromStorage from "./utils/auth/get-auth-data-from-storage"

export default function App() {
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()

	return (
		<Routes>
			<Route path = "/" element = {<Home />}></Route>
			<Route path = "/login" element = {<Login />} />
			<Route path = "/register" element = {<Register />} />
			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
