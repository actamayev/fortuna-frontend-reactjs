import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Missing from "./pages/missing"
import Dashboard from "./pages/dashboard"
import LoginPage from "./pages/auth/login-page"
import RegisterPage from "./pages/auth/register-page"

import CreatorRoutes from "./routes/creator-routes"

import useGetAuthDataFromStorage from "./utils/auth/get-auth-data-from-storage"

export default function App() {
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()

	return (
		<Routes>
			<Route path = "/" element = {<Home />} />
			<Route path = "/login" element = {<LoginPage />} />
			<Route path = "/register" element = {<RegisterPage />} />
			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "/creator/*" element = {<CreatorRoutes />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
