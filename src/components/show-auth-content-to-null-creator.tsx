import { useState } from "react"
import Login from "./login"
import Register from "./register"

interface Props {
	whereToNavigate: string
}

export default function ShowAuthContentToNullCreator(props: Props) {
	const { whereToNavigate } = props
	const [loginOrRegister, setLoginOrRegister] = useState<LoginOrRegister>("Register")

	if (loginOrRegister === "Register") {
		return (
			<Register
				whereToNavigate={whereToNavigate}
				setLoginOrRegister={setLoginOrRegister}
				defaultUserType="creator"
			/>
		)
	}
	return <Login whereToNavigate={whereToNavigate} setLoginOrRegister={setLoginOrRegister}/>
}
