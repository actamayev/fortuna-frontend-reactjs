declare global {
	type EmailOrPhone = "Email" | "Phone"

	type EmailOrPhoneOrUnknown = EmailOrPhone | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/my-ownership" |
		"/my-wallet" |
		"/my-profile" |

		"/creator/my-content" |
		"/creator/my-wallet" |
		"/creator/upload-content"

	type DynamicPageNames =
		`/v/${string}` |
		`/c/${string}` |
		`/s/${string}`

	type PageNames = StaticPageNames | DynamicPageNames

	type Currencies = "sol" | "usd"

	type SiteThemes = "light" | "dark"
}

export {}
