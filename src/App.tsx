import { Routes, Route } from "react-router-dom"

import Login from "./pages/login"
import Missing from "./pages/missing"

export default function App() {

	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/register" element = {<Login />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
