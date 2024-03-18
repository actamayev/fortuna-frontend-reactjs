import _ from "lodash"
import emailOrPhone from "./email-or-phone"

export default function confirmRegisterFields(credentials: RegisterCredentials, setError: (error: string) => void): boolean {
	const contactType = emailOrPhone(credentials.contact)
	if (
		_.isEmpty(credentials.contact) || _.isEmpty(credentials.password) ||
		_.isEmpty(credentials.passwordConfirmation) || _.isEmpty(credentials.username)
	) {
		setError("Please enter an Email/Phone and password")
		return false
	} else if (_.isEqual(contactType, "Unknown")) {
		setError("Please enter a valid email or phone number")
		return false
	} else if (credentials.password.length < 6) {
		setError("Password must be at least 6 characters")
		return false
	} else if (!_.isEqual(credentials.password, credentials.passwordConfirmation)) {
		setError("Passwords do not match")
		return false
	} else {
		setError("")
		return true
	}
}
