declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/ownership" |
		"/wallet" |
		"/recent-uploads" |

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

	type AscOrDesc = "asc" | "desc"

	type RoundOrFixed = "round" | "fixed"

	type DepositOrWithDrawal = "deposit" | "withdrawal"
}

export {}
