declare global {
	interface CommonNewVideoDetails {
		videoName: string
		description: string
		isContentExclusive: boolean
		tierData: TierData[]
	}

	interface TierData extends TierDataToSend {
		isPurchaseTierChecked: boolean
	}

	interface TierDataToSend {
		tierNumber: number
		purchasesInThisTier: number | null // null means there is no limit
		tierDiscount: number
		tierAccessPrice: number
	}

	interface NewVideoDetails extends CommonNewVideoDetails {
		selectedImage: File | null
		selectedVideo: File | null
	}

	interface CreateVideo extends CommonNewVideoDetails {
		imageUrl: string
		uuid: string
		uploadedImageId: number
		uploadedVideoId: number
		tierData: TierDataToSend[]
	}

	interface MyContent extends CommonNewVideoDetails {
		videoId: number
		videoListingStatus: VideoListingStatus
		imageUrl: string
		uuid: string
	}
}

export {}
