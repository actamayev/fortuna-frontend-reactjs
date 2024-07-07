declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/ownership" |
		"/profile" |
		"/wallet" |

		"/creator/studio" |
		"/creator/create-content" |

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
		"/videos"

	type AtPrefixedString = string & { __brand: "AtPrefixedString" }
}

export {}
