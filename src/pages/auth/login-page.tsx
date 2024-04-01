import Login from "../../components/auth/login"
// import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

export default function LoginPage() {
	// useRedirectKnownUser()

	return (
		<Login whereToNavigate="/my-ownership"/>
	)
}
