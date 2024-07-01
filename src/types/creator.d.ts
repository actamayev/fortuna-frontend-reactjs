declare global {
	interface CommonNewVideoDetails {
		videoName: string
		description: string
		isContentExclusive: boolean
		tierData: TierData[]
	}

	interface NewVideoDetails extends CommonNewVideoDetails {
		selectedImage: File | null
		selectedVideo: File | null
	}

	interface TierDataToSend {
		tierNumber: number
		purchasesInThisTier: number | null // null means there is no limit
		tierAccessPriceUsd: number
	}

	interface TierData extends TierDataToSend {
		isPurchaseTierChecked: boolean
	}

	interface CreateVideo extends CommonNewVideoDetails {
		uuid: string
		uploadedImageId: number
		uploadedVideoId: number
		tierData: TierDataToSend[]
	}

	interface MyContent extends CommonNewVideoDetails {
		videoListingStatus: PostedVideoListingStatuses
		imageUrl: string
		uuid: string
		createdAt: Date
		numberOfExclusivePurchasesSoFar: number | null
	}
}

export {}
