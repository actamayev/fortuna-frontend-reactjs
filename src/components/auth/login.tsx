import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import SubLoginInfo from "./sub-login-info"
import PasswordInput from "./password-input"
import GoogleSignIn from "./google/google-sign-in"
import LoginContactInput from "./login-contact-input"
import AuthTemplate from "../templates/auth-template"
import useLoginSubmit from "../../hooks/auth/login-submit"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function Login(props: Props) {
	const { whereToNavigate, setLoginOrRegister } = props
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] = useState<LoginCredentials>({
		contact: "",
		password: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const loginSubmit = useLoginSubmit(whereToNavigate, loginInformation, setError, setLoading)

	const isShowPassword = useMemo(() => {
		if (showPassword) return "text"
		return "password"
	}, [showPassword])

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<LoginCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<LoginCredentials> }))
		}
	}

	return (
		<div>
			<AuthTemplate title="Login">
				<form onSubmit={loginSubmit}>
					<LoginContactInput
						credentials={loginInformation}
						setCredentials={setLoginInformation}
					/>

					<PasswordInput
						credentials = {loginInformation}
						setCredentials = {createSetCredentialsFunction(setLoginInformation)}
						showPassword = {isShowPassword}
					/>

					<ShowOrHidePasswordButton
						showPassword = {showPassword}
						setShowPassword = {setShowPassword}
					/>

					<ErrorMessage error={error} />

					<Button
						className = "mt-3 w-full font-semibold text-lg text-white"
						colorClass = "bg-blue-600"
						hoverClass = "hover:bg-blue-700"
						disabled = {loading}
						title = "Login"
					/>
				</form>
				<SubLoginInfo setLoginOrRegister={setLoginOrRegister}/>
			</AuthTemplate>
			<div className="mt-4">
				<GoogleSignIn whereToNavigate = {whereToNavigate}/>
			</div>
		</div>
	)
}
