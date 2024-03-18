import FormGroup from "../form-group"

interface Props {
	credentials: RegisterCredentials
    setCredentials: (newCredentials: RegisterCredentials) => void
}

export default function RegisterContactInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			label = "Email/Phone Number"
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({ ...credentials, contact: event.target.value })}
			required
			value = {credentials.contact || ""}
		/>
	)
}
