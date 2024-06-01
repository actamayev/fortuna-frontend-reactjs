import AuthHeaderLinks from "./auth/auth-header-links"

export default function NullUserNavLink() {
	return (
		<>
			<AuthHeaderLinks
				title="Log in"
				className="hover:bg-zinc-100 mx-2 text-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
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
