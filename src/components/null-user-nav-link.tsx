import AuthHeaderLinks from "./auth/auth-header-links"

export default function NullUserNavLink() {
	return (
		<>
			<AuthHeaderLinks
				title="Log in"
				className="hover:bg-zinc-100 mr-2 text-zinc-900"
				linkTo="/login"
			/>
			<AuthHeaderLinks
				title="Sign up"
				className="bg-blue-600 hover:bg-blue-700 text-white"
				linkTo="/register"
			/>
		</>
	)
}
