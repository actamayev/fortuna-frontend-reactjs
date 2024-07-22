import _ from "lodash"
import dayjs from "dayjs"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class VideoClass {
	public searchTerm: string | null = null

	public videos: UrlExtendedSingleVideoData[] = []
	public videosBeingRetrieved: string[] = []
	public isRetrievingVideoUrl = false

	public homeScreenCreators: CreatorData[] = []

	public creatorVideosFilter: CreatorVideosFilter = {
		titleIncludes: "",
		timeframeSort: "Latest",
		lockFilter: "All"
	}

	public areHomePageVideosRetrieved: boolean = false
	public areHomePageVideosBeingRetrieved: boolean = false

	private videoSearchMap: Map<string, SearchData[]> = new Map() // This maps the search term to SearchData.
	public isCurrentlySearching: boolean = false

	private creatorData: CreatorDataHeldInClass[] = []
	public isCreatorDataBeingRetrieved: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public findVideoFromUUID(videoUUID: string | undefined): UrlExtendedSingleVideoData | undefined {
		if (_.isUndefined(videoUUID)) return undefined

		return (
			// Would return the first one:
			this.contextForVideo(videoUUID) ||
			this.findVideoNotInVideosArray(videoUUID)
		)
	}

	private findVideoNotInVideosArray(videoUUID: string): UrlExtendedSingleVideoData | undefined {
		return (
			this.findVideoInSearchMapByUUID(videoUUID) ||
			this.findVideoInCreatorDataMapByUUID(videoUUID)
		)
	}

	private contextForVideo(videoUUID: string): UrlExtendedSingleVideoData | undefined {
		return this.videos.find(video => video.uuid === videoUUID)
	}

	public contextForSearchMap(searchTerm: string): SearchData[] | undefined {
		return this.videoSearchMap.get(searchTerm)
	}

	public contextForCreatorData(creatorUsername: string): CreatorDataHeldInClass | undefined {
		if (_.isUndefined(creatorUsername)) return undefined
		return this.creatorData.find(data => data.creatorUsername === creatorUsername)
	}

	public contextForCreatorDataNotIncluding(
		creatorUsername: string,
		uuidToNotInclude: string
	): CreatorDataHeldInClass | undefined {
		const creatorData = this.contextForCreatorData(creatorUsername)
		if (_.isUndefined(creatorData)) return undefined

		const filteredVideoData = creatorData.videoData.filter(video => video.uuid !== uuidToNotInclude)

		return { ...creatorData, videoData: filteredVideoData }
	}

	private findVideoInSearchMapByUUID(videoUUID: string): UrlExtendedSingleVideoData | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, searchDataArray] of this.videoSearchMap.entries()) {
			const videoData = searchDataArray.find(
				data => _.has(data, "uuid") && data.uuid === videoUUID
			) as UrlExtendedSingleVideoData | undefined

			if (!_.isUndefined(videoData)) return videoData
		}
		return
	}

	private findVideoInCreatorDataMapByUUID(videoUUID: string): UrlExtendedSingleVideoData | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, creatorDataHeld] of this.creatorData.entries()) {
			const videoData = creatorDataHeld.videoData.find(video => video.uuid === videoUUID)

			if (!_.isUndefined(videoData)) return videoData
		}
	}

	public setHomePageVideos = action((videoData: VideoDataWithUrlRetrievalStatus[]): void => {
		if (_.isEmpty(videoData)) return
		videoData.map(singleVideo => this.addVideoToVideosList(singleVideo))
	})

	public addVideoToVideosList = action((video: VideoDataWithUrlRetrievalStatus): void => {
		const existingIndex = this.videos.findIndex(v => v.uuid === video.uuid)

		if (existingIndex !== -1) {
		// Replace existing video
			this.videos[existingIndex] = video
			return
		}

		// Insert new video into sorted list
		const index = _.sortedIndexBy(this.videos, video, (vd) => -dayjs(vd.createdAt).unix())
		this.videos.splice(index, 0, video)
	})

	public setHomePageCretors = action((creatorData: CreatorData[]): void => {
		if (_.isEmpty(creatorData)) return
		creatorData.map(singleCreator => this.homeScreenCreators.push(singleCreator))
	})

	public setVideoUrlRetrievalAttempted = action((videoUUID: string): void => {
		const index = this.videos.findIndex(video => video.uuid === videoUUID)
		if (!_.isEqual(index, -1)) {
			this.videos[index].videoUrlRetrievalAttempted = true
			return
		}

		const existingVideo = this.findVideoNotInVideosArray(videoUUID)
		if (_.isUndefined(existingVideo)) return
		existingVideo.videoUrlRetrievalAttempted = true
		this.addVideoToVideosList(existingVideo)
	})

	public addVideoUrlToVideo = action((videoUUID: string, videoUrl: string): void => {
		const index = this.videos.findIndex(video => video.uuid === videoUUID)
		if (!_.isEqual(index, -1)) {
			this.videos[index].videoUrl = videoUrl
			this.videos[index].videoUrlRetrievalAttempted = true
			return
		}
		// This logic is run when there is a video that is in the search map or the creator data, but isn't in the videos list.
		// Since the search map and creator data hold data without the videoUrl,
		// need to first copy the data over, and then add the video url
		const existingVideo = this.findVideoNotInVideosArray(videoUUID)
		if (_.isUndefined(existingVideo)) return
		existingVideo.videoUrl = videoUrl
		existingVideo.videoUrlRetrievalAttempted = true
		this.addVideoToVideosList(existingVideo)
	})

	public setVideoSearchMapData = action((searchTerm: string, videoSearchData: SearchData[]): void => {
		if (_.isEmpty(videoSearchData)) this.videoSearchMap.set(searchTerm, videoSearchData)
		videoSearchData.map(singleSearchData => this.addVideoSearchDataToMap(searchTerm, singleSearchData))
	})

	private addVideoSearchDataToMap = action((searchTerm: string, videoSearchData: VideoDataWithUrlRetrievalStatus | CreatorData): void => {
		const existingData = this.contextForSearchMap(searchTerm)
		if (_.isUndefined(existingData)) {
			this.videoSearchMap.set(searchTerm, [videoSearchData])
			return
		}
		this.videoSearchMap.set(searchTerm, [...existingData, videoSearchData])
	})

	public addRetrievedCreatorData (creatorDataResponse: CreatorDataResponse): void {
		const { creatorData, videoData } = creatorDataResponse
		const newVideoData = videoData.map(video => ({
			...video,
			videoUrlRetrievalAttempted: false
		}))
		const newCreatorData: CreatorDataHeldInClass = {
			...creatorData,
			videoData: newVideoData
		}
		const existingData = this.contextForCreatorData(newCreatorData.creatorUsername)
		if (!_.isUndefined(existingData)) return

		if (_.isEmpty(newCreatorData.videoData)) {
			this.creatorData.push(newCreatorData)
			return
		}
		// Sort videoData by date within the newCreatorData
		newCreatorData.videoData.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())

		// Find the correct index to insert the new data based on the most recent video date
		const index = _.sortedIndexBy(this.creatorData, newCreatorData, (data) =>
			-dayjs(_.maxBy(data.videoData, (vd) => dayjs(vd.createdAt).unix())?.createdAt).unix()
		)
		// Insert the new creator data into the sorted position
		this.creatorData.splice(index, 0, newCreatorData)
	}

	public updateVideoDetailsAfterUserPurchase(
		videoUUID: string,
		tierNumber: number,
		isTierSoldOut: boolean,
		isVideoSoldOut: boolean
	): void {
		const video = this.contextForVideo(videoUUID)
		if (_.isUndefined(video)) return

		if (isVideoSoldOut === true) video.videoListingStatus = "SOLDOUT"
		if (isTierSoldOut === true) {
			const tierIndex = video.tierData.findIndex(tier => tier.tierNumber === tierNumber)
			if (tierIndex !== -1) {
				const tierData = video.tierData[tierIndex]
				tierData.isTierSoldOut = true
				video.tierData[tierIndex] = tierData
			}
		}
		if (!_.isNull(video.numberOfExclusivePurchasesSoFar)) {
			video.numberOfExclusivePurchasesSoFar ++
		}
		video.isUserAbleToAccessVideo = true
	}

	public updateVideoDetailsAfterLikeOrRemoveLike(videoUUID: string) {
		const video = this.contextForVideo(videoUUID)
		if (_.isUndefined(video)) return

		if (video.userLikeStatus === false) {
			video.numberOfLikes ++
			video.userLikeStatus = true
			return
		}
		video.numberOfLikes --
		video.userLikeStatus = false
	}

	public addVideoUUIDToRetrievingList(videoUUID: string): void {
		this.videosBeingRetrieved.unshift(videoUUID)
	}

	public removeVideoUUIDFromRetrievingList = action((videoUUID: string | undefined): void => {
		this.videosBeingRetrieved.filter(item => item !== videoUUID)
	})

	public setSearchTerm = action((newSearchTerm: string | null): void => {
		this.searchTerm = newSearchTerm
	})

	public setIsRetrievingVideoUrl = action((newState: boolean): void => {
		this.isRetrievingVideoUrl = newState
	})

	public setIsCurrentlySearching = action((newState: boolean): void => {
		this.isCurrentlySearching = newState
	})

	public setIsCreatorDataBeingRetrieved = action((newState: boolean): void => {
		this.isCreatorDataBeingRetrieved = newState
	})

	public updateCreatorVideosFilter = action(<K extends keyof CreatorVideosFilter>(
		key: K, newValue: CreatorVideosFilter[K]
	) => {
		this.creatorVideosFilter[key] = newValue
	})

	private clearCreatorVideosFilter = action(() => {
		this.creatorVideosFilter = {
			titleIncludes: "",
			timeframeSort: "Latest",
			lockFilter: "All"
		}
	})

	private clearVideoDataOnLogout = action((): void => {
		this.videos.map(video => {
			video.userLikeStatus = false
			if (video.isVideoExclusive === false) return
			delete video.videoUrl
			video.isUserAbleToAccessVideo = false
		})
		this.creatorData.map(creator => {
			creator.videoData.map(video => {
				video.userLikeStatus = false
				if (video.isVideoExclusive === false) return
				video.isUserAbleToAccessVideo = false
			})
		})
		this.videoSearchMap.forEach((searchDataArray) => {
			searchDataArray.forEach(searchData => {
				if ("userLikeStatus" in searchData) {
					searchData.userLikeStatus = false
					if (searchData.isVideoExclusive === true) {
						searchData.isUserAbleToAccessVideo = false
					}
				}
			})
		})
		this.areHomePageVideosRetrieved = false
		this.clearCreatorVideosFilter()
	})

	private resetUrlRetrievalAttempt = action((): void => {
		this.videos.map(video => {
			video.videoUrlRetrievalAttempted = false
		})
		this.creatorData.map(creator => {
			creator.videoData.map(video => {
				video.videoUrlRetrievalAttempted = false
			})
		})
		this.videoSearchMap.forEach((searchDataArray) => {
			searchDataArray.forEach(searchData => {
				if ("videoUrlRetrievalAttempted" in searchData) {
					searchData.videoUrlRetrievalAttempted = false
				}
			})
		})
	})

	public clearVideosOnLogin = action((): void => {
		this.resetUrlRetrievalAttempt()
		this.areHomePageVideosRetrieved = false
		this.clearCreatorVideosFilter()
	})

	public logout() {
		this.clearVideoDataOnLogout()
		this.videosBeingRetrieved = []
		this.isRetrievingVideoUrl = false

		this.isCurrentlySearching = false
		this.isCreatorDataBeingRetrieved = false
		this.setSearchTerm(null)
	}
}

const VideoContext = createContext(new VideoClass())

export default function VideoProvider ({ children }: { children: React.ReactNode }) {
	const videoClass = useMemo(() => new VideoClass(), [])

	return (
		<VideoContext.Provider value={videoClass}>
			{children}
		</VideoContext.Provider>
	)
}

export const useVideoContext = () => useContext(VideoContext)
