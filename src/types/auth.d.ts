declare global {
	interface LoginCredentials {
		contact: string
		password: string
	}

	interface RegisterCredentialsToSend {
		contact: string
		username: string
		password: string
	}

	interface RegisterCredentials extends RegisterCredentialsToSend{
		passwordConfirmation: string
	}
}

export {}
