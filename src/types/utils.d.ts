declare global {
	type EmailOrPhone = "Email" | "Phone"

	type EmailOrPhoneOrUnknown = EmailOrPhone | "Unknown"
}

export {}
