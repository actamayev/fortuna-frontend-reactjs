import { useState } from "react"
import Login from "./auth/login"
import Register from "./auth/register"

interface Props {
	whereToNavigate: PageNames
}

export default function ShowAuthToNullUser(props: Props) {
	const { whereToNavigate } = props
	const [loginOrRegister, setLoginOrRegister] = useState<LoginOrRegister>("Register")

	if (loginOrRegister === "Register") {
		return (
			<Register
				whereToNavigate={whereToNavigate}
				setLoginOrRegister={setLoginOrRegister}
			/>
		)
	}
	return (
		<Login
			whereToNavigate={whereToNavigate}
			setLoginOrRegister={setLoginOrRegister}
		/>
	)
}
