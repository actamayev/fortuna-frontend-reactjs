declare global {
	interface VideoDataLessVideoUrl {
		videoName: string
		videoListingStatus: PostedVideoListingStatuses
		description: string
		imageUrl: string
		uuid: string
		creatorUsername: string
		creatorProfilePictureUrl: string | null
		isVideoExclusive: boolean
		isUserAbleToAccessVideo: boolean
		createdAt: Date
		tierData: TierDataFromDB[]
		numberOfExclusivePurchasesSoFar: number | null
	}

	interface SingleVideoDataFromBackend extends VideoDataLessVideoUrl {
		videoUrl?: string
	}

	interface CreatorData {
		creatorUsername: string
		creatorProfilePictureUrl: string | null
	}

	type SearchData = VideoDataLessVideoUrl | CreatorData

	interface CreatorDataHeldInClass extends CreatorData {
		videoData: VideoDataLessVideoUrl[]
	}

	type PostedVideoListingStatuses = "LISTED" | "SOLDOUT"
}

export {}
