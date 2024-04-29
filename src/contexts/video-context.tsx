import _ from "lodash"
import dayjs from "dayjs"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class VideoClass {
	public searchTerm: string | null = null

	public videos: VideoData[] = []
	public videosBeingRetrieved: string[] = []
	public areHomePageVideosRetrieved: boolean = false
	public areHomePageVideosBeingRetrieved: boolean = false

	private videoSearchMap: Map<string, SearchData[]> = new Map() // This maps the search term to SearchData.
	public isCurrentlySearching: boolean = false

	private creatorData: CreatorDataHeldInClass[] = []
	public isCreatorDataBeingRetrieved: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public findVideoFromUUID(videoUUID: string): VideoData | undefined {
		let video = this.contextForVideo(videoUUID)
		if (!_.isUndefined(video)) return video
		video = this.findVideoInSearchMapByUUID(videoUUID)
		if (!_.isUndefined(video)) return video
		video = this.findVideoInCreatorDataMapByUUID(videoUUID)
		return video
	}

	private contextForVideo(videoUUID: string): VideoData | undefined {
		return this.videos.find(video => video.uuid === videoUUID)
	}

	public contextForSearchMap(searchTerm: string): SearchData[] | undefined {
		return this.videoSearchMap.get(searchTerm)
	}

	public contextForCreatorData(creatorUsername: string): CreatorDataHeldInClass | undefined {
		return this.creatorData.find(data => data.creatorUsername === creatorUsername)
	}

	private findVideoInSearchMapByUUID(videoUUID: string): VideoData | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, searchDataArray] of this.videoSearchMap.entries()) {
			const videoData = searchDataArray.find(data =>"videoUrl" in data && data.uuid === videoUUID) as VideoData | undefined

			if (!_.isUndefined(videoData)) return videoData
		}
		return
	}

	private findVideoInCreatorDataMapByUUID(videoUUID: string): VideoData | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, creatorDataHeld] of this.creatorData.entries()) {
			const videoData = creatorDataHeld.videoData.find(video => video.uuid === videoUUID)

			if (!_.isUndefined(videoData)) return videoData
		}
	}

	public setHomePageVideos = action((videoData: VideoData[]): void => {
		if (_.isEmpty(videoData)) return
		videoData.map(singleVideo => this.addVideoToVideosList(singleVideo))
	})

	public addVideoToVideosList = action((video: VideoData): void => {
		if (!_.isUndefined(this.contextForVideo(video.uuid))) return
		this.videos.unshift(video)
	})

	public setVideoSearchMapData = action((searchTerm: string, videoSearchData: SearchData[]): void => {
		if (_.isEmpty(videoSearchData)) this.videoSearchMap.set(searchTerm, videoSearchData)
		videoSearchData.map(singleSearchData => this.addVideoSearchDataToMap(searchTerm, singleSearchData))
	})

	private addVideoSearchDataToMap = action((searchTerm: string, videoSearchData: VideoData | CreatorData): void => {
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
	})

	public addVideoUUIDToRetrievingList(videoUUID: string): void {
		this.videosBeingRetrieved.unshift(videoUUID)
	}

	public removeVideoUUIDFromRetrievingList = action((videoUUID: string): void => {
		this.videosBeingRetrieved.filter(item => item !== videoUUID)
	})

	public setSearchTerm = action((newSearchTerm: string): void => {
		this.searchTerm = newSearchTerm
	})

	public setIsCurrentlySearching = action((newState: boolean): void => {
		this.isCurrentlySearching = newState
	})

	public setIsCreatorDataBeingRetrieved = action((newState: boolean): void => {
		this.isCreatorDataBeingRetrieved = newState
	})
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
