declare global {
	interface SolanaTransaction {
		solTransferId: number
		solAmountTransferred: number
		usdAmountTransferred: number
		transferByCurrency: Currencies
		depositOrWithdrawal: DepositOrWithDrawal

		transactionSignature: string

		transferDateTime: Date
		transferToUsername?: string
		transferToPublicKey?: string
		transferFromUsername: string

		newWalletBalanceSol: number | null
		newWalletBalanceUsd: number | null
	}

	interface MyPurchasedExclusiveContent {
		videoName: string
		imageUrl: string
		uuid: string
		videoDurationSeconds: number
		purchaseDate: Date
		priceInSol: number
		priceInUsd: number
		channelName: string
		creatorProfilePictureUrl: string | null
		creatorUsername: string

		newWalletBalanceSol: number | null
		newWalletBalanceUsd: number | null

		videoAccessPurchaseTransactionSignature: string
	}

	type WalletFilterRange = "Month" | "Week" | "Today"

	type TransactionTypes = "Withdrawals" | "Deposits" | "Content Purchases"

	interface WalletFilter {
		transactionTitleIncludes: string
		orderDateBy: AscOrDesc
		transactionType: TransactionTypes[]
	}

	type SingleTransaction = SolanaTransaction | MyPurchasedExclusiveContent

	type OwnershipSortBy = "Date Purchased" | "Amount Paid"

	interface OwnershipFilter {
		sortBy: OwnershipSortBy
		orderBy: AscOrDesc
		ownershipTitleIncludes: string
	}
}

export {}
