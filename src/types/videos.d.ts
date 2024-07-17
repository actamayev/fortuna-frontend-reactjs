declare global {
	interface VideoDataLessVideoUrlResponse {
		videoName: string
		videoListingStatus: PostedVideoListingStatuses
		description: string
		imageUrl: string
		videoDurationSeconds: number
		uuid: string
		creatorUsername: string
		creatorProfilePictureUrl: string | null
		channelBannerPictureUrl: string | null
		isVideoExclusive: boolean
		isUserAbleToAccessVideo: boolean
		createdAt: Date
		tierData: TierDataFromDB[]
		numberOfExclusivePurchasesSoFar: number | null
		numberOfLikes: number
		userLikeStatus: boolean
		channelName: string
		videoUrlRetrievalAttempted?: boolean
	}

	interface VideoDataWithUrlRetrievalStatus extends VideoDataLessVideoUrlResponse {
		videoUrlRetrievalAttempted: boolean
	}

	interface TierDataFromDB extends TierDataToSend {
		isTierSoldOut: boolean
	}

	interface UrlExtendedSingleVideoData extends VideoDataWithUrlRetrievalStatus {
		videoUrl?: string
	}

	interface CreatorData {
		creatorUsername: string
		channelName: string
		channelDescription: string
		numberOfVideos: number
		socialPlatformLinks: SocialPlatformLinks[]
		creatorProfilePictureUrl: string | null
		channelBannerPictureUrl: string | null
	}

	type SearchData = VideoDataWithUrlRetrievalStatus | CreatorData

	interface CreatorDataHeldInClass extends CreatorData {
		videoData: VideoDataWithUrlRetrievalStatus[]
	}

	type PostedVideoListingStatuses = "LISTED" | "SOLDOUT"

	type NonExclusiveVideoListingStatuses = "LISTED" | "UNLISTED"

	type AllVideoListingStatuses = PostedVideoListingStatuses | NonExclusiveVideoListingStatuses

	type TimeFramesToSortBy = "Latest" | "Popular" | "Oldest"
	type LockFilter = "All" | "Locked" | "Unlocked"

	interface CreatorVideosFilter {
		titleIncludes: string
		timeframeSort: TimeFramesToSortBy
		lockFilter: LockFilter
	}
}

export {}
