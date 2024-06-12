import _ from "lodash"
import { useState } from "react"
import Button from "../../components/buttons/button"
import FormGroup from "../../components/form-group"
import ErrorMessage from "../../components/error-message"
import AuthTemplate from "../../components/templates/auth-template"
import useUsernameSubmit from "../../hooks/auth/google/username-submit"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"
import useRedirectUserWithUsername from "../../hooks/redirects/redirect-user-with-username"

export default function RegisterUsername() {
	useRedirectUserWithUsername()
	const [username, setUsername] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const usernameSubmit = useUsernameSubmit(username, setError, setLoading)
	const handleTypeUsername = useHandleTypeUsername()

	return (
		<AuthTemplate title="Register Username">
			<form onSubmit={usernameSubmit}>

				<FormGroup
					label = "Username"
					type = "text"
					placeholder = "abc123"
					onChange = {(event) => setUsername(handleTypeUsername(event))}
					required
					value = {username}
				/>

				<Button
					className = "mt-3 w-full font-semibold text-lg text-zinc-50"
					colorClass = "bg-blue-600"
					hoverClass = "hover:bg-blue-700"
					disabled = {loading}
					title = {_.isEmpty(username) ? "Register username" : `Register ${username}`}
				/>

				<ErrorMessage error={error} />
			</form>
		</AuthTemplate>
	)
}
