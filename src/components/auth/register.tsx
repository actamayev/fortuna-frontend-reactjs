import { useMemo, useState } from "react"
import Button from "../button"
import ErrorMessage from "../error-message"
import PasswordInput from "./password-input"
import UsernameInput from "./username-input"
import ConfirmPassword from "./confirm-password"
import SubRegisterInfo from "./sub-register-info"
import GoogleSignIn from "./google/google-sign-in"
import AuthTemplate from "../templates/auth-template"
import RegisterContactInput from "./register-contact-input"
import useRegisterSubmit from "../../hooks/auth/register-submit"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function Register(props: Props) {
	const { whereToNavigate, setLoginOrRegister } = props
	useRedirectKnownUser()
	const [registerInformation, setRegisterInformation] = useState<RegisterCredentials>({
		contact: "",
		username: "",
		password: "",
		passwordConfirmation: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const registerSubmit = useRegisterSubmit(whereToNavigate, registerInformation, setError, setLoading)

	const isShowPassword = useMemo(() => {
		if (showPassword) return "text"
		return "password"
	}, [showPassword])

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<RegisterCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<RegisterCredentials> }))
		}
	}

	return (
		<div>
			<AuthTemplate title="Register">
				<form onSubmit={registerSubmit}>
					<RegisterContactInput
						credentials={registerInformation}
						setCredentials={setRegisterInformation}
					/>

					<UsernameInput
						credentials={registerInformation}
						setCredentials={setRegisterInformation}
					/>

					<PasswordInput
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
						showPassword = {isShowPassword}
					/>

					<ConfirmPassword
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
						showPassword = {isShowPassword}
					/>

					<ShowOrHidePasswordButton
						showPassword = {showPassword}
						setShowPassword = {setShowPassword}
					/>

					<ErrorMessage error={error} />

					<Button
						className = "mt-3 w-full font-semibold text-lg text-white border"
						colorClass = "bg-blue-600 border-blue-600"
						hoverClass = "hover:bg-blue-700 hover:border-yellow-400"
						disabled = {loading}
						title = "Register"
					/>
				</form>
				<SubRegisterInfo setLoginOrRegister = {setLoginOrRegister}/>
			</AuthTemplate>
			<div className="mt-4">
				<GoogleSignIn whereToNavigate={whereToNavigate}/>
			</div>
		</div>
	)
}
