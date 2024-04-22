import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class VideoClass {
	public videos: VideoData[] = []
	public videosBeingRetrieved: string[] = []
	public areHomePageVideosRetrieved: boolean = false
	public areHomePageVideosBeingRetrieved: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public contextForVideo(videoUUID: string): VideoData | undefined {
		return this.videos.find(video => video.uuid === videoUUID)
	}

	public setHomePageVideos = action((videoData: VideoData[]): void => {
		if (_.isEmpty(videoData)) return
		videoData.map(singleVideo => this.addVideoToMap(singleVideo))
	})

	public addVideoToMap = action((video: VideoData): void => {
		if (!_.isUndefined(this.contextForVideo(video.uuid))) return
		this.videos.unshift(video)
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
