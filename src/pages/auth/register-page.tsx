import Register from "../../components/auth/register"
// import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

export default function RegisterPage() {
	// useRedirectKnownUser()

	return (
		<Register whereToNavigate="/my-ownership" />
	)
}
