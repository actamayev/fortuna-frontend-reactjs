import { SocialPlatforms } from "../utils/platform-icons"

declare global {
	interface CommonNewVideoDetails {
		videoName: string
		description: string
		isContentExclusive: boolean
		tierData: TierData[]
		videoTags: string[]
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

	interface VideoTag {
		videoTag: string
		videoTagId: number
	}

	interface CreateVideo extends CommonNewVideoDetails {
		uuid: string
		uploadedImageId: number
		uploadedVideoId: number
		tierData: TierDataToSend[]
	}

	interface MyContent extends CommonNewVideoDetails {
		videoId: number
		videoListingStatus: AllVideoListingStatuses
		imageUrl: string
		isVideoFeatured: boolean
		videoDurationSeconds: number
		uuid: string
		numberOfLikes: number
		createdAt: Date
		totalCreatorProfitInSol: number
		totalCreatorProfitInUsd: number
		numberOfExclusivePurchasesSoFar: number | null
		videoTags: VideoTag[]
	}

	interface SocialPlatformLinks {
		socialPlatform: SocialPlatformKey
		socialLink: string
	}

	type SocialPlatformKey = keyof typeof SocialPlatforms

	type CreatorContentSortByFields = "Date" | "Earnings" | "Likes"

	interface MyContentFilter {
		sortBy: CreatorContentSortByFields
		orderBy: AscOrDesc
		titleIncludes: string
		visibility: "all" | "listed" | "unlisted"
	}
}

export {}
