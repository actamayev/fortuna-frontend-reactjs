declare global {
	interface VideoDataLessVideoUrl {
		splName: string
		splPublicKey: string
		listingSharePriceUsd: number
		splListingStatus: SPLListingStatus
		description: string
		imageUrl: string
		uuid: string
		totalNumberShares: number
		sharesRemainingForSale: number
		originalContentUrl: string
		contentMintDate: Date
		creatorUsername: string
		creatorProfilePictureUrl: string | null
		isSplExclusive: boolean
		valueNeededToAccessExclusiveContentUsd: number | null
		isContentInstantlyAccessible: boolean | null
		priceToInstantlyAccessExclusiveContentUsd: number | null
		allowValueFromSameCreatorTokensForExclusiveContent: boolean | null
	}

	interface SingleVideoDataFromBackend extends VideoDataLessVideoUrl {
		videoUrl?: string
	}

	interface VideoDataWithVideoUrl extends SingleVideoDataFromBackend {
		isUserAbleToAccessVideo?: boolean
	}

	interface CreatorData {
		creatorUsername: string
		creatorProfilePictureUrl: string | null
	}

	type SearchData = VideoDataLessVideoUrl | CreatorData

	interface CreatorDataHeldInClass extends CreatorData {
		videoData: VideoDataLessVideoUrl[]
	}
}

export {}
