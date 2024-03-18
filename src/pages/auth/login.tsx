import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import Button from "../../components/button"
import useLoginSubmit from "../../hooks/auth/login-submit"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"
import AuthTemplate from "../../components/login-and-registration-form/auth-template"
import ErrorMessage from "../../components/login-and-registration-form/error-message"
import SubLoginInfo from "../../components/login-and-registration-form/sub-login-info"
import PasswordInput from "../../components/login-and-registration-form/password-input"
import LoginContactInput from "../../components/login-and-registration-form/login-contact-input"
import ShowOrHidePasswordButton from "../../components/login-and-registration-form/show-or-hide-password-button"

function Login() {
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] =
		useState<LoginCredentials>({
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

	const loginSubmit = useLoginSubmit(loginInformation, setError, setLoading)

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
			<SubLoginInfo />
		</AuthTemplate>
	)
}

export default observer(Login)
