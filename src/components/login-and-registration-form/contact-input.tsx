import FormGroup from "../form-group"

interface Props {
	credentials: LoginCredentials | RegisterCredentials
    setCredentials: (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => void
}

export default function ContactInput (props: Props) {
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
