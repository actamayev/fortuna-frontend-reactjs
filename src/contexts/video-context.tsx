import _ from "lodash"
import { action, makeObservable, observable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class VideoClass {
	public videosMap: Map<string, Video> = new Map() // Maps UUID to Video
	public videosBeingRetrieved: string[] = []

	constructor() {
		makeObservable(this, {
			videosMap: observable
		})
	}

	public contextForVideo(videoUUID: string): Video | undefined {
		return this.videosMap.get(videoUUID)
	}

	public addVideoToMap = action((video: Video): void => {
		if (this.videosMap.has(video.uuid)) return
		this.videosMap.set(video.uuid, video)
	})

	public tokenPurchaseUpdateAvailableShares = action((videoUuid: string, numberOfShares: number): void => {
		const video = this.contextForVideo(videoUuid)
		if (_.isUndefined(video)) return
		video.sharesRemainingForSale -= numberOfShares
		this.videosMap.set(video.uuid, video)
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
