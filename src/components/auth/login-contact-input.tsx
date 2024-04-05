import FormGroup from "../form-group"

interface Props {
	credentials: LoginCredentials
	setCredentials: (newCredentials: LoginCredentials) => void
}

export default function LoginContactInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			label = "Email/Username"
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({ ...credentials, contact: event.target.value })}
			required
			value = {credentials.contact || ""}
		/>
	)
}
