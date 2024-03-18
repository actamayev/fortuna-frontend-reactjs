declare global {
	interface LoginCredentials {
		contact: string
		password: string
	}

	interface RegisterCredentials {
		contact: string
		username: string
		password: string
		passwordConfirmation: string
	}
}

export {}
