declare global {
	interface VideoDataLessVideoUrl {
		videoName: string
		videoListingStatus: VideoListingStatus
		description: string
		imageUrl: string
		uuid: string
		creatorUsername: string
		creatorProfilePictureUrl: string | null
		isVideoExclusive: boolean
		isUserAbleToAccessVideo: boolean
		createdAt: Date
		tierData: TierDataToSend[]
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
}

export {}
