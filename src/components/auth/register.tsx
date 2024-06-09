import { useState } from "react"
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
	const registerSubmit = useRegisterSubmit(whereToNavigate, registerInformation, setError, setLoading)

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
					/>

					<ConfirmPassword
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
					/>

					<ErrorMessage error={error} />

					<Button
						className = "mt-3 w-full font-semibold text-lg text-zinc-50"
						colorClass = "bg-blue-600"
						hoverClass = "hover:bg-blue-700"
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
