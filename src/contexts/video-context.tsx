import _ from "lodash"
import dayjs from "dayjs"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class VideoClass {
	public searchTerm: string | null = null

	public videos: SingleVideoDataFromBackend[] = []
	public videosBeingRetrieved: string[] = []
	public isRetrievingVideoUrl = false

	public areHomePageVideosRetrieved: boolean = false
	public areHomePageVideosBeingRetrieved: boolean = false

	private videoSearchMap: Map<string, SearchData[]> = new Map() // This maps the search term to SearchData.
	public isCurrentlySearching: boolean = false

	private creatorData: CreatorDataHeldInClass[] = []
	public isCreatorDataBeingRetrieved: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public findVideoFromUUID(videoUUID: string | undefined): SingleVideoDataFromBackend | undefined {
		if (_.isUndefined(videoUUID)) return undefined

		return (
			// Would return the first one:
			this.contextForVideo(videoUUID) ||
			this.findVideoNotInVideosArray(videoUUID)
		)
	}

	private findVideoNotInVideosArray(videoUUID: string): SingleVideoDataFromBackend | undefined {
		return (
			this.findVideoInSearchMapByUUID(videoUUID) ||
			this.findVideoInCreatorDataMapByUUID(videoUUID)
		)
	}

	private contextForVideo(videoUUID: string): SingleVideoDataFromBackend | undefined {
		return this.videos.find(video => video.uuid === videoUUID)
	}

	public contextForSearchMap(searchTerm: string): SearchData[] | undefined {
		return this.videoSearchMap.get(searchTerm)
	}

	public contextForCreatorData(creatorUsername: string | undefined): CreatorDataHeldInClass | undefined {
		if (_.isUndefined(creatorUsername)) return undefined
		return this.creatorData.find(data => data.creatorUsername === creatorUsername)
	}

	private findVideoInSearchMapByUUID(videoUUID: string): SingleVideoDataFromBackend | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, searchDataArray] of this.videoSearchMap.entries()) {
			const videoData = searchDataArray.find(
				data => _.has(data, "uuid") && data.uuid === videoUUID
			) as SingleVideoDataFromBackend | undefined

			if (!_.isUndefined(videoData)) return videoData
		}
		return
	}

	private findVideoInCreatorDataMapByUUID(videoUUID: string): SingleVideoDataFromBackend | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, creatorDataHeld] of this.creatorData.entries()) {
			const videoData = creatorDataHeld.videoData.find(video => video.uuid === videoUUID)

			if (!_.isUndefined(videoData)) return videoData
		}
	}

	public setHomePageVideos = action((videoData: VideoDataLessVideoUrl[]): void => {
		if (_.isEmpty(videoData)) return
		videoData.map(singleVideo => this.addVideoToVideosList(singleVideo))
	})

	public addVideoToVideosList = action((video: VideoDataLessVideoUrl): void => {
		if (!_.isUndefined(this.contextForVideo(video.uuid))) return

		if (_.isEmpty(this.videos)) {
			this.videos.push(video)
			return
		}

		const index = _.sortedIndexBy(this.videos, video, (vd) =>
			-dayjs(vd.contentMintDate).unix()
		)

		this.videos.splice(index, 0, video)
	})

	public addVideoUrlToVideo = action((videoUUID: string, videoUrl: string): void => {
		const index = this.videos.findIndex(video => video.uuid === videoUUID)
		if (!_.isEqual(index, -1)) {
			this.videos[index].videoUrl = videoUrl
			return
		}
		// This logic is run when there is a video that is in the search map or the creator data, but isn't in the videos list.
		// Since the search map and creator data hold data without the videoUrl,
		// need to first copy the data over, and then add the video url
		const existingVideo = this.findVideoNotInVideosArray(videoUUID)
		if (_.isUndefined(existingVideo)) return
		existingVideo.videoUrl = videoUrl
		this.addVideoToVideosList(existingVideo)
	})

	public setVideoSearchMapData = action((searchTerm: string, videoSearchData: SearchData[]): void => {
		if (_.isEmpty(videoSearchData)) this.videoSearchMap.set(searchTerm, videoSearchData)
		videoSearchData.map(singleSearchData => this.addVideoSearchDataToMap(searchTerm, singleSearchData))
	})

	private addVideoSearchDataToMap = action((searchTerm: string, videoSearchData: VideoDataLessVideoUrl | CreatorData): void => {
		const existingData = this.contextForSearchMap(searchTerm)
		if (_.isUndefined(existingData)) {
			this.videoSearchMap.set(searchTerm, [videoSearchData])
			return
		}
		this.videoSearchMap.set(searchTerm, [...existingData, videoSearchData])
	})

	public addCreatorData (newCreatorData: CreatorDataHeldInClass): void {
		const existingData = this.contextForCreatorData(newCreatorData.creatorUsername)
		if (!_.isUndefined(existingData)) return

		if (_.isEmpty(newCreatorData.videoData)) {
			this.creatorData.push(newCreatorData)
			return
		}
		// Sort videoData by date within the newCreatorData
		newCreatorData.videoData.sort((a, b) => dayjs(b.contentMintDate).unix() - dayjs(a.contentMintDate).unix())

		// Find the correct index to insert the new data based on the most recent video date
		const index = _.sortedIndexBy(this.creatorData, newCreatorData, (data) =>
			-dayjs(_.maxBy(data.videoData, (vd) => dayjs(vd.contentMintDate).unix())?.contentMintDate).unix()
		)
		// Insert the new creator data into the sorted position
		this.creatorData.splice(index, 0, newCreatorData)
	}

	public tokenPurchaseUpdateAvailableShares = action((videoUUID: string, numberOfShares: number): void => {
		const index = this.videos.findIndex(video => video.uuid === videoUUID)
		if (_.isEqual(index, -1)) return
		this.videos[index].sharesRemainingForSale -= numberOfShares
		if (this.videos[index].sharesRemainingForSale !== 0) return
		this.videos[index].splListingStatus = "SOLDOUT"
	})

	public addVideoUUIDToRetrievingList(videoUUID: string): void {
		this.videosBeingRetrieved.unshift(videoUUID)
	}

	public removeVideoUUIDFromRetrievingList = action((videoUUID: string): void => {
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

	private clearVideoDataOnLogout = action((): void => {
		this.videos.map(video => {
			if (video.isSplExclusive === false) return
			delete video.videoUrl
			video.isUserAbleToAccessVideo = false
		})
	})

	public clearVideosOnLogin = action((): void => {
		this.videos = []
		this.areHomePageVideosRetrieved = false
	})

	public logout() {
		this.clearVideoDataOnLogout()
		this.videosBeingRetrieved = []
		this.isRetrievingVideoUrl = false

		this.isCurrentlySearching = false
		// Don't clear video search map on logout - no need.
		this.creatorData = []
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
