import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import Button from "../button"
import AuthTemplate from "./auth-template"
import ErrorMessage from "../error-message"
import PasswordInput from "./password-input"
import UsernameInput from "./username-input"
import ConfirmPassword from "./confirm-password"
import SubRegisterInfo from "./sub-register-info"
import RegisterContactInput from "./register-contact-input"
import useRegisterSubmit from "../../hooks/auth/register-submit"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

function Register(props: Props) {
	const { whereToNavigate, setLoginOrRegister } = props
	const [registerInformation, setRegisterInformation] = useState<RegisterCredentials>({
		contact: "",
		username: "",
		password: "",
		passwordConfirmation: ""
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
