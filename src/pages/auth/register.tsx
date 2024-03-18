import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import Button from "../../components/button"
import useRegisterSubmit from "../../hooks/auth/register-submit"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"
import AuthTemplate from "../../components/login-and-registration-form/auth-template"
import ErrorMessage from "../../components/login-and-registration-form/error-message"
import PasswordInput from "../../components/login-and-registration-form/password-input"
import UsernameInput from "../../components/login-and-registration-form/username-input"
import ConfirmPassword from "../../components/login-and-registration-form/confirm-password"
import SubRegisterInfo from "../../components/login-and-registration-form/sub-register-info"
import RegisterContactInput from "../../components/login-and-registration-form/register-contact-input"
import ShowOrHidePasswordButton from "../../components/login-and-registration-form/show-or-hide-password-button"

function Register() {
	useRedirectKnownUser()
	const [registerInformation, setRegisterInformation] =
		useState<RegisterCredentials>({
			contact: "",
			username: "",
			password: "",
			passwordConfirmation: "",
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const isShowPassword = useCallback(() => {
		if (showPassword) return "text"
		return "password"
	}, [showPassword])

	const registerSubmit = useRegisterSubmit(registerInformation, setError, setLoading)

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<RegisterCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<RegisterCredentials> }))
		}
	}

	return (
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
					showPassword = {isShowPassword()}
				/>

				<ConfirmPassword
					credentials = {registerInformation}
					setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
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
					title = "Register"
				/>
			</form>
			<SubRegisterInfo />
		</AuthTemplate>
	)
}

export default observer(Register)
