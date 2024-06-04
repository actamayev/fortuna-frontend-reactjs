declare global {
	interface LoginCredentials {
		contact: string
		password: string
	}

	interface RegisterCredentialsToSend extends LoginCredentials {
		username: string
		siteTheme: SiteThemes
	}

	interface RegisterCredentials extends LoginCredentials {
		username: string
		passwordConfirmation: string
	}

	type LoginOrRegister = "Login" | "Register"
}

export {}
