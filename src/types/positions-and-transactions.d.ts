declare global {
	interface SolanaTransaction {
		solTransferId: number
		solAmountTransferred: number
		usdAmountTransferred: number
		transferByCurrency: Currencies
		outgoingOrIncoming: "outgoing" | "incoming"

		transferDateTime: Date
		transferToUsername?: string
		transferToPublicKey?: string
		transferFromUsername: string
	}

	interface MyPurchasedExclusiveContent {
		videoName: string
		imageUrl: string
		uuid: string
	}

	type WalletFilterRange = "Month" | "Week" | "Today"
}

export {}
