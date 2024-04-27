import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class VideoClass {
	public searchTerm: string | null = null
	public videos: VideoData[] = []
	public videosBeingRetrieved: string[] = []
	public areHomePageVideosRetrieved: boolean = false
	public areHomePageVideosBeingRetrieved: boolean = false
	public videoSearchMap: Map<string, SearchData[]> = new Map() // This maps the search term to SearchData.
	public isCurrentlySearching: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public findVideoFromUUID(videoUUID: string): VideoData | undefined {
		let video = this.contextForVideo(videoUUID)
		if (!_.isUndefined(video)) return video
		video = this.findVideoInSearchMapByUUID(videoUUID)
		return video
	}

	private contextForVideo(videoUUID: string): VideoData | undefined {
		return this.videos.find(video => video.uuid === videoUUID)
	}

	public contextForSearchMap(searchTerm: string): SearchData[] | undefined {
		return this.videoSearchMap.get(searchTerm)
	}

	private findVideoInSearchMapByUUID(videoUUID: string): VideoData | undefined {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [key, searchDataArray] of this.videoSearchMap.entries()) {
			const videoData = searchDataArray.find(data =>"videoUrl" in data && data.uuid === videoUUID) as VideoData | undefined

			if (!_.isUndefined(videoData)) return videoData
		}
		return
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
