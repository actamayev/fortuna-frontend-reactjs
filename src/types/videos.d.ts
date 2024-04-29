declare global {
	interface VideoData {
		splName: string
		splPublicKey: string
		offeringSharePriceSol: number
		offeringSharePriceUsd: number
		description: string
		imageUrl: string
		videoUrl: string
		uuid: string
		totalNumberShares: number
		sharesRemainingForSale: number
		originalContentUrl: string
		contentMintDate: Date
		creatorUsername: string
		creatorProfilePictureUrl: string | null
	}

	interface CreatorData {
		creatorUsername: string
		creatorProfilePictureUrl: string | null
	}

	type SearchData = VideoData | CreatorData

	interface CreatorDataHeldInClass extends CreatorData {
		videoData: VideoData[]
	}
}

export {}
