declare global {
	interface LoginCredentials {
		contact: string
		password: string
	}

	interface RegisterCredentialsToSend {
		contact: string
		username: string
		password: string
		siteTheme: SiteThemes
	}

	interface RegisterCredentials {
		contact: string
		username: string
		password: string
		passwordConfirmation: string
	}

	type LoginOrRegister = "Login" | "Register"
}

export {}
