declare global {
	type EmailOrPhone = "Email" | "Phone"

	type EmailOrPhoneOrUnknown = EmailOrPhone | "Unknown"

	type UserTypes = "creator" | "supporter"
}

export {}
