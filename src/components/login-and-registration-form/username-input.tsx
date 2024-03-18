import FormGroup from "../form-group"

interface Props {
	credentials: RegisterCredentials
    setCredentials: (newCredentials: RegisterCredentials) => void
}

export default function UsernameInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			label = "Username"
			type = "username"
			placeholder = "bigBaller"
			onChange = {(event) => setCredentials({ ...credentials, username: event.target.value })}
			required
			value = {credentials.username || ""}
		/>
	)
}
