declare global {
	interface MyContent {
		videoId: number
		videoName: string
		listingPriceToAccessUsd: number
		videoListingStatus: VideoListingStatus
		description: string
		imageUrl: string
		uuid: string
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

	interface MyPurchasedExclusiveContent {
		videoName: string
		imageUrl: string
		uuid: string
	}
}

export {}
