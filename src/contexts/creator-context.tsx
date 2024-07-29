import _ from "lodash"
import dayjs from "dayjs"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class CreatorClass {
	public myContent: MyContent[] = []

	public hasContentToRetrieve = true
	public isRetrievingContent = false

	public myContentFilter: MyContentFilter = {
		sortBy: "Date",
		orderBy: "desc",
		titleIncludes: "",
		visibility: "all"
	}

	public newVideoDetails: NewVideoDetails = {
		videoName: "",
		description: "",
		selectedImage: null,
		selectedVideo: null,
		isContentExclusive: true,
		tierData: [{
			tierNumber: 1,
			isPurchaseTierChecked: false,
			purchasesInThisTier: null,
			tierAccessPriceUsd: 2
		}],
		videoTags: []
	}
	public isNewVideoLoading = false

	public channelName: string | null = null
	public channelDescription: string | null = null
	public profilePictureUrl: string | null = null
	public channelBannerUrl: string | null = null
	public socialPlatformLinks: SocialPlatformLinks[] = []
	public isRetrievingCreatorInfo = false

	constructor() {
		makeAutoObservable(this)
	}

	public contextForMyContent(uuid: string): MyContent | undefined {
		return this.myContent.find(content => content.uuid === uuid)
	}

	public setIsNewVideoLoading = action((newState: boolean): void => {
		this.isNewVideoLoading = newState
	})

	public setContent = action((newContentList: MyContent[]): void => {
		this.myContent = []
		if (_.isEmpty(newContentList)) return
		newContentList.map(singleNewContent => this.addContent(singleNewContent))
	})

	public addContent = action((newContent: MyContent): void => {
		if (!_.isUndefined(this.contextForMyContent(newContent.uuid))) return

		if (_.isEmpty(this.myContent)) {
			this.myContent.push(newContent)
			return
		}

		const index = _.sortedIndexBy(this.myContent, newContent, (mc) =>
			-dayjs(mc.createdAt).unix()
		)

		this.myContent.splice(index, 0, newContent)
	})

	public checkIfUuidExistsInContentList(uuid: string): boolean {
		for (const content of this.myContent) {
			if (_.isEqual(content.uuid, uuid)) return true
		}
		return false
	}

	get numberOfUnlistedVideos(): number {
		return this.myContent.filter(content => content.videoListingStatus === "UNLISTED").length
	}

	public updateMyContentFilter = action((sortBy: CreatorContentSortByFields) => {
		if (this.myContentFilter.sortBy === sortBy) this.updateMyContentOrderBy()
		else {
			this.myContentFilter.sortBy = sortBy
			this.myContentFilter.orderBy = "desc"
		}
	})

	private updateMyContentOrderBy = action(() => {
		if (this.myContentFilter.orderBy === "asc") this.myContentFilter.orderBy = "desc"
		else this.myContentFilter.orderBy = "asc"
	})

	public updateVisibilityFilter = action(() => {
		if (this.myContentFilter.visibility === "all") this.myContentFilter.visibility = "listed"
		else if (this.myContentFilter.visibility === "listed") this.myContentFilter.visibility = "unlisted"
		else this.myContentFilter.visibility = "all"
	})

	public updateMyContentFilterTitle = action((newTitle: string) => {
		this.myContentFilter.titleIncludes = newTitle
	})

	get featuredContentId(): number | undefined {
		const myFeaturedConent = this.myContent.find(content => content.isVideoFeatured === true)
		return myFeaturedConent?.videoId
	}

	public featureVideoAndUnfeatureVideo = action((videoIdToFeature: number) => {
		this.myContent = this.myContent.map(content => {
			if (content.videoId === videoIdToFeature) {
				return { ...content, isVideoFeatured: true }
			} else if (content.videoId === this.featuredContentId) {
				return { ...content, isVideoFeatured: false }
			}
			return content
		})
	})

	public unfeatureVideo = action(() => {
		this.myContent = this.myContent.map(content => {
			if (content.isVideoFeatured === true) {
				return { ...content, isVideoFeatured: false }
			}
			return content
		})
	})

	public isAbleToAddTagToVideo(videoId: number, videoTag: string): boolean {
		if (_.isEmpty(videoTag)) return false

		const video = this.myContent.find(v => v.videoId === videoId)
		if (_.isUndefined(video)) return false

		if (video.videoTags.length >= 12) return false

		const normalizedTag = videoTag.toLowerCase()
		const tagExists = video.videoTags.some(tag => tag.videoTag.toLowerCase() === normalizedTag)
		if (tagExists === true) return false

		return true
	}

	public addTagToVideo = action((videoId: number, videoTag: string, videoTagId: number) => {
		const ableToAddTag = this.isAbleToAddTagToVideo(videoId, videoTag)
		if (ableToAddTag === false) return

		const video = this.myContent.find(v => v.videoId === videoId)
		if (_.isUndefined(video)) return

		video.videoTags.push({ videoTagId, videoTag })
	})

	public removeTagFromVideo = action((videoId: number, videoTagId: number) => {
		const video = this.myContent.find(v => v.videoId === videoId)
		if (_.isUndefined(video)) return

		// Find the index of the tag to remove
		const tagIndex = video.videoTags.findIndex(tag => tag.videoTagId === videoTagId)
		if (tagIndex === -1) return

		// Remove the tag from the list
		video.videoTags.splice(tagIndex, 1)
	})

	public updateNewVideoDetails = action(<K extends keyof NewVideoDetails>(
		key: K, value: NewVideoDetails[K]
	) => {
		if (typeof this.newVideoDetails[key] !== typeof value) {
			console.warn(`Type mismatch when trying to set ${key}`)
			return
		}
		this.newVideoDetails[key] = value
		if (key === "isContentExclusive") {
			if (value === false || !_.isEmpty(this.newVideoDetails.tierData)) return
			this.newVideoDetails.tierData = [{
				tierNumber: 1,
				isPurchaseTierChecked: false,
				purchasesInThisTier: null,
				tierAccessPriceUsd: 2
			}]
		}
	})

	public addTagToNewVideoDetails = action((tagName: string): void => {
		if (this.newVideoDetails.videoTags.length >= 12) return
		const normalizedTag = tagName.toLowerCase().slice(0, 50)
		const tagExists = this.newVideoDetails.videoTags.some(tag => tag.toLowerCase() === normalizedTag)
		if (tagExists === true) return

		this.newVideoDetails.videoTags.push(tagName)
	})

	public removeTagFromNewVideoDetails = action((tagName: string): void => {
		const normalizedTag = tagName.toLowerCase()
		const tagExists = this.newVideoDetails.videoTags.some(tag => tag.toLowerCase() === normalizedTag)
		if (tagExists === false) return

		this.newVideoDetails.videoTags = this.newVideoDetails.videoTags.filter(tag => tag.toLowerCase() !== normalizedTag)
	})

	public updateNewVideoTierDetails = action(<K extends keyof TierData>(
		key: K, tierNumber: number, value: TierData[K]
	) => {
		this.newVideoDetails.tierData[tierNumber - 1][key] = value
		if (key === "purchasesInThisTier") {
			if (_.isNull(value)) this.newVideoDetails.tierData[tierNumber - 1].isPurchaseTierChecked = false
		}
	})

	public areThereMoreTiers(tierNumber: number): boolean {
		return this.newVideoDetails.tierData.length > tierNumber
	}

	get lowestTierPrice(): number {
		return this.newVideoDetails.tierData[this.newVideoDetails.tierData.length - 1].tierAccessPriceUsd
	}

	public addVideoTier() {
		if (this.newVideoDetails.tierData.length >= 3) return
		this.newVideoDetails.tierData.push({
			tierNumber: this.newVideoDetails.tierData.length + 1,
			isPurchaseTierChecked: false,
			purchasesInThisTier: null,
			tierAccessPriceUsd: 2
		})
		this.resetVideoTierDetailsAboveLowestTier()
	}

	private resetVideoTierDetailsAboveLowestTier () {
		for (const tier of this.newVideoDetails.tierData) {
			if (tier.tierNumber === this.newVideoDetails.tierData.length) return
			if (!_.isNull(this.newVideoDetails.tierData[tier.tierNumber - 1].purchasesInThisTier)) continue
			this.newVideoDetails.tierData[tier.tierNumber - 1].purchasesInThisTier = 100
		}
	}

	public deleteTier(tierNumber: number) {
	// Find the index of the tier to be deleted
		const tierIndex = this.newVideoDetails.tierData.findIndex(tier => tier.tierNumber === tierNumber)

		// Filter out the tier to be deleted
		this.newVideoDetails.tierData = this.newVideoDetails.tierData.filter(tier => tier.tierNumber !== tierNumber)

		// Re-label the remaining tiers to maintain sequential numbering
		this.newVideoDetails.tierData.forEach((tier, index) => {
			tier.tierNumber = index + 1
		})

		// Set isPurchaseTierChecked to true for the previous tier if it exists
		if (tierIndex > 0 && tierIndex <= this.newVideoDetails.tierData.length) {
			this.newVideoDetails.tierData[tierIndex - 1].isPurchaseTierChecked = true
		}
	}

	get doesNewVideoLimitNumberBuyers(): boolean {
		return this.newVideoDetails.tierData[this.newVideoDetails.tierData.length - 1].purchasesInThisTier !== null
	}

	private getProfitByVideoTier(tierNumber: number): number | null {
		const tierData = this.newVideoDetails.tierData.find(tier => tier.tierNumber === tierNumber)
		if (_.isUndefined(tierData) || _.isNull(tierData.purchasesInThisTier)) return null

		return tierData.purchasesInThisTier * tierData.tierAccessPriceUsd
	}

	get totalMaxProfit(): number | null {
		const tierOneProfitPreFee = this.getProfitByVideoTier(1)
		const tierTwoProfitPreFee = this.getProfitByVideoTier(2)
		const tierThreeProfitPreFee = this.getProfitByVideoTier(3)

		if (_.isNull(tierOneProfitPreFee) && _.isNull(tierTwoProfitPreFee) && _.isNull(tierThreeProfitPreFee)) return null

		return (
			(tierOneProfitPreFee as number) +
			(tierTwoProfitPreFee as number) +
			(tierThreeProfitPreFee as number)
		)
	}

	get newVideoFortunaFee(): number | null {
		if (_.isNull(this.totalMaxProfit)) return null
		return this.totalMaxProfit * 0.025
	}

	get profitAfterFee(): number | null {
		if (_.isNull(this.totalMaxProfit) || _.isNull(this.newVideoFortunaFee)) return null
		return (this.totalMaxProfit - this.newVideoFortunaFee)
	}

	public setChannelName = action((newChannelName: string): void => {
		this.channelName = newChannelName
	})

	public setChannelDescription = action((newChannelDescription: string): void => {
		this.channelDescription = newChannelDescription
	})

	public setProfilePictureUrl = action((newProfilePictureUrl: string | null): void => {
		this.profilePictureUrl = newProfilePictureUrl
	})

	public setChannelBannerUrl = action((newChannelBannerUrl: string | null): void => {
		this.channelBannerUrl = newChannelBannerUrl
	})

	get nonEmptySocialPlatformLinks(): SocialPlatformLinks[] {
		return this.socialPlatformLinks.filter(link => link.socialLink.trim() !== "")
	}

	public updateVideoListingStatus = action((videoUUID: string) => {
		const video = this.contextForMyContent(videoUUID)
		if (_.isUndefined(video) || video.videoListingStatus === "SOLDOUT") return
		video.videoListingStatus = video.videoListingStatus === "LISTED" ? "UNLISTED" : "LISTED"
	})

	public updateVideoProperty = action(<K extends keyof MyContent>(
		videoUUID: string, key: K, newValue: MyContent[K]
	) => {
		const video = this.contextForMyContent(videoUUID)
		if (_.isUndefined(video)) return
		video[key] = newValue
	})

	public addSocialPlatformLink = action((socialPlatformLink: SocialPlatformLinks): void => {
		const index = this.socialPlatformLinks.findIndex(
			link => link.socialPlatform === socialPlatformLink.socialPlatform
		)

		if (index === -1) {
			this.socialPlatformLinks.push(socialPlatformLink)
			return
		}
		this.socialPlatformLinks[index].socialLink = socialPlatformLink.socialLink
	})

	public removeSocialPlatformLink = action((socialPlatform: SocialPlatformKey): void => {
		this.socialPlatformLinks = this.socialPlatformLinks.filter(
			socialPlatformLink => socialPlatformLink.socialPlatform !== socialPlatform
		)
	})

	public setRetrievedCreatorInfo(creatorInfo: CreatorInfoResponse) {
		this.channelName = creatorInfo.channelName
		this.channelDescription = creatorInfo.channelDescription
		this.profilePictureUrl = creatorInfo.profilePictureUrl
		this.channelBannerUrl = creatorInfo.channelBannerUrl
		this.socialPlatformLinks = creatorInfo.socialPlatformLinks
	}

	public setHasContentToRetrieve = action((newState: boolean): void => {
		this.hasContentToRetrieve = newState
	})

	public setIsRetrievingContent = action((newState: boolean): void => {
		this.isRetrievingContent = newState
	})

	public resetNewVideoDetails = action(() => {
		this.newVideoDetails = {
			videoName: "",
			description: "",
			selectedImage: null,
			selectedVideo: null,
			isContentExclusive: true,
			tierData: [{
				tierNumber: 1,
				isPurchaseTierChecked: false,
				purchasesInThisTier: null,
				tierAccessPriceUsd: 2
			}],
			videoTags: []
		}
	})

	public setIsRetrievingCreatorInfo = action((newState: boolean): void => {
		this.isRetrievingCreatorInfo = newState
	})

	public logout() {
		this.myContent = []
		this.hasContentToRetrieve = true
		this.isRetrievingContent = false

		this.myContentFilter = {
			sortBy: "Date",
			orderBy: "desc",
			titleIncludes: "",
			visibility: "all"
		}

		this.resetNewVideoDetails()
		this.isNewVideoLoading = false

		this.channelName = null
		this.channelDescription = null
		this.profilePictureUrl = null
		this.channelBannerUrl = null
		this.socialPlatformLinks = []
		this.isRetrievingCreatorInfo = false
	}
}

const CreatorContext = createContext(new CreatorClass())

export default function CreatorProvider ({ children }: { children: React.ReactNode }) {
	const creatorClass = useMemo(() => new CreatorClass(), [])

	return (
		<CreatorContext.Provider value={creatorClass}>
			{children}
		</CreatorContext.Provider>
	)
}

export const useCreatorContext = () => useContext(CreatorContext)
