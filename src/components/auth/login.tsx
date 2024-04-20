import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import Button from "../button"
import AuthTemplate from "./auth-template"
import ErrorMessage from "../error-message"
import SubLoginInfo from "./sub-login-info"
import PasswordInput from "./password-input"
import LoginContactInput from "./login-contact-input"
import useLoginSubmit from "../../hooks/auth/login-submit"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

function Login(props: Props) {
	const { whereToNavigate, setLoginOrRegister } = props
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] = useState<LoginCredentials>({
		contact: "",
		password: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const isShowPassword = useCallback(() => {
		if (showPassword) return "text"
		return "password"
	}, [showPassword])

	const loginSubmit = useLoginSubmit(whereToNavigate, loginInformation, setError, setLoading)

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<LoginCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<LoginCredentials> }))
		}
	}

	return (
		<AuthTemplate title="Login">
			<form onSubmit={loginSubmit}>
				<LoginContactInput
					credentials={loginInformation}
					setCredentials={setLoginInformation}
				/>

				<PasswordInput
					credentials = {loginInformation}
					setCredentials = {createSetCredentialsFunction(setLoginInformation)}
					showPassword = {isShowPassword()}
				/>

				<ShowOrHidePasswordButton
					showPassword = {showPassword}
					setShowPassword = {setShowPassword}
				/>

				<ErrorMessage error={error} />

				<Button
					className = "mt-3 w-full font-semibold text-lg text-white border-b-2"
					colorClass = "bg-blue-600"
					hoverClass = "hover:font-bold hover:border-yellow-400"
					disabled = {loading}
					title = "Login"
				/>
			</form>
			<SubLoginInfo setLoginOrRegister={setLoginOrRegister}/>
		</AuthTemplate>
	)
}

export default observer(Login)
