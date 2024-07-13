declare global {
	interface SolanaTransaction {
		solTransferId: number
		solAmountTransferred: number
		usdAmountTransferred: number
		outgoingOrIncoming: "outgoing" | "incoming"

		transferDateTime: Date
		transferToUsername?: string
		transferToPublicKey?: string
		transferFromUsername: string
		transferFeeSol?: number
		transferFeeUsd?: number
	}

	interface MyPurchasedExclusiveContent {
		videoName: string
		imageUrl: string
		uuid: string
	}

	type WalletFilterRange = "Month" | "Week" | "Today"
}

export {}
