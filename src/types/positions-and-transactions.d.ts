declare global {
	interface SolanaTransaction {
		solTransferId: number
		solAmountTransferred: number
		usdAmountTransferred: number
		transferByCurrency: Currencies
		depositOrWithdrawal: "deposit" | "withdrawal"

		transferDateTime: Date
		transferToUsername?: string
		transferToPublicKey?: string
		transferFromUsername: string
	}

	interface MyPurchasedExclusiveContent {
		videoName: string
		imageUrl: string
		uuid: string
		videoDurationSeconds: number
	}

	type WalletFilterRange = "Month" | "Week" | "Today"

	type TransactionTypes = "Withdrawals" | "Deposits" | "Content Purchases"

	interface WalletFilter {
		transactionTitleIncludes: string
		orderDateBy: AscOrDesc
		transactionType: TransactionTypes[]
	}
}

export {}
