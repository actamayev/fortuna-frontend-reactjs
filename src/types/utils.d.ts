declare global {
	type EmailOrPhone = "Email" | "Phone"

	type EmailOrPhoneOrUnknown = EmailOrPhone | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/my-orders" |
		"/my-ownership" |
		"/my-profile" |
		"/my-wallet" |

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

	type PathHeaders =
		"/auth" |
		"/exchange" |
		"/positions-and-transactions" |
		"/personal-info" |
		"/search" |
		"/solana" |
		"/upload" |
		"/videos" |
		"/youtube"
}

export {}
