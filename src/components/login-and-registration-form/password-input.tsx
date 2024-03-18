import FormGroup from "../form-group"

interface Props {
	credentials: LoginCredentials | RegisterCredentials
    setCredentials: (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => void
	showPassword: "text" | "password"
}

export default function PasswordInput (props: Props) {
	const { credentials, setCredentials, showPassword } = props

	return (
		<FormGroup
			label = "Password"
			type = {showPassword}
			placeholder = "Password"
			onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
			required
			value = {credentials.password || ""}
		/>
	)
}
