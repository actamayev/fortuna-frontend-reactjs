declare global {
	interface MyContent extends CommonSplDetails {
		imageUrl: string
		videoUrl: string
		uuid: string
		splId: number
		mintAddress: string
	}

	interface MyOwnership {
		splName: string
		splPublicKey: string
		purchaseData: PurchaseData[]
		imageUrl: string
		uuid: string
		isMyContent: boolean
		creatorUsername: string
		originalListingPricePerShareUsd: number
	}

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
		createdAt: Date
	}

	interface MyExclusiveContentData {
		splName: string
		imageUrl: string
		uuid: string
	}
}

export {}
