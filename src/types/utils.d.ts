declare global {
	type EmailOrPhone = "Email" | "Phone"

	type EmailOrPhoneOrUnknown = EmailOrPhone | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/my-ownership" |
		"/my-profile" |
		"/my-wallet" |

		"/creator/my-content" |
		"/creator/upload-content" |

		"/privacy-policy" |

		"/about" |
		"/careers" |
		"/contact"

	type DynamicPageNames =
		`/v/${string}` |
		`/c/${AtPrefixedString}` |
		`/s/${string}`

	type PageNames = StaticPageNames | DynamicPageNames

	type Currencies = "sol" | "usd"

	type SiteThemes = "light" | "dark"

	type PathHeaders =
		"/auth" |
		"/creator" |
		"/market" |
		"/personal-info" |
		"/positions-and-transactions" |
		"/search" |
		"/solana" |
		"/upload" |
		"/videos" |
		"/youtube"

	type AtPrefixedString = string & { __brand: "AtPrefixedString" }
}

export {}
