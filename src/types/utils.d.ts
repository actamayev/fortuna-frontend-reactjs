declare global {
	type EmailOrPhone = "Email" | "Phone"

	type EmailOrPhoneOrUnknown = EmailOrPhone | "Unknown"

	type PageNames =
		"/" |
		"/login" |
		"/register" |
		"/my-ownership" |
		"/my-wallet" |
		"/creator/my-content" |
		"/creator/my-wallet" |
		"/creator/upload-content"
}

export {}
