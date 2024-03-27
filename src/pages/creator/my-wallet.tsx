import _ from "lodash"
import { useState } from "react"
import Login from "../../components/login"
import Register from "../../components/register"
import { useAuthContext } from "../../contexts/auth-context"

export default function MyWallet() {
	const authClass = useAuthContext()
	const [loginOrRegister, setLoginOrRegister] = useState<LoginOrRegister>("Register")

	if (_.isNull(authClass.accessToken)) {
		if (loginOrRegister === "Register") {
			return <Register whereToNavigate="/creator/my-wallet" setLoginOrRegister={setLoginOrRegister}/>
		}
		return <Login whereToNavigate="/creator/my-wallet" setLoginOrRegister={setLoginOrRegister}/>
	}

	return (
		<>
			My Wallet
		</>
	)
}
