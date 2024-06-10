import FormGroup from "../form-group"

interface Props {
	credentials: LoginCredentials | RegisterCredentials
	setCredentials: (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => void
	label: string
}

export default function ContactInput (props: Props) {
	const { credentials, setCredentials, label } = props

	return (
		<FormGroup
			label = {label}
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({ ...credentials, contact: event.target.value })}
			required
			value = {credentials.contact || ""}
		/>
	)
}
