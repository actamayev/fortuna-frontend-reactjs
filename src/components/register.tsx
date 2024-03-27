import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import Button from "./button"
import useRegisterSubmit from "../hooks/auth/register-submit"
import AuthTemplate from "./login-and-registration-form/auth-template"
import ErrorMessage from "./login-and-registration-form/error-message"
import PasswordInput from "./login-and-registration-form/password-input"
import UsernameInput from "./login-and-registration-form/username-input"
import ConfirmPassword from "./login-and-registration-form/confirm-password"
import SubRegisterInfo from "./login-and-registration-form/sub-register-info"
import RegisterContactInput from "./login-and-registration-form/register-contact-input"
import ShowOrHidePasswordButton from "./login-and-registration-form/show-or-hide-password-button"

interface Props {
	whereToNavigate: string
	defaultUserType: UserTypes
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

function Register(props: Props) {
	const { whereToNavigate, defaultUserType, setLoginOrRegister } = props
	const [registerInformation, setRegisterInformation] =
		useState<RegisterCredentials>({
			contact: "",
			username: "",
			password: "",
			passwordConfirmation: "",
			defaultUserType: defaultUserType
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const isShowPassword = useCallback(() => {
		if (showPassword) return "text"
		return "password"
	}, [showPassword])

	const registerSubmit = useRegisterSubmit(whereToNavigate, registerInformation, setError, setLoading)

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
			<SubRegisterInfo setLoginOrRegister = {setLoginOrRegister}/>
		</AuthTemplate>
	)
}

export default observer(Register)
