import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import Button from "./button"
import useLoginSubmit from "../hooks/auth/login-submit"
import AuthTemplate from "./login-and-registration-form/auth-template"
import ErrorMessage from "./login-and-registration-form/error-message"
import SubLoginInfo from "./login-and-registration-form/sub-login-info"
import PasswordInput from "./login-and-registration-form/password-input"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import LoginContactInput from "./login-and-registration-form/login-contact-input"
import ShowOrHidePasswordButton from "./login-and-registration-form/show-or-hide-password-button"

interface Props {
	whereToNavigate: string
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
					className = "mt-3 w-full font-bold text-lg text-white"
					colorClass = "bg-blue-600"
					hoverClass = "hover:bg-blue-700"
					disabled = {loading}
					title = "Login"
				/>
			</form>
			<SubLoginInfo setLoginOrRegister={setLoginOrRegister}/>
		</AuthTemplate>
	)
}

export default observer(Login)
