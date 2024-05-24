import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useVideoContext } from "../../contexts/video-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveVideoUrlData(videoUUID: string | undefined): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveVideoUrlData = useCallback(async (): Promise<void> => {
		try {
			if (
				_.isUndefined(videoUUID) ||
				videoClass.videosBeingRetrieved.includes(videoUUID) ||
				videoClass.isRetrievingVideoUrl === true
			) return
			const video = videoClass.findVideoFromUUID(videoUUID)
			if (!_.isUndefined(video) && !_.isUndefined(video.videoUrl)) return
			if (video?.isUserAbleToAccessVideo === true) return
			videoClass.setIsRetrievingVideoUrl(true)

			const videoUrlData = await fortunaApiClient.videoDataService.getVideoUrl(videoUUID)

			if (!_.isEqual(videoUrlData.status, 200) || isNonSuccessResponse(videoUrlData.data)) {
				throw Error("Unable to get video URL")
			}
			videoClass.setIsRetrievingVideoUrl(false)
			videoClass.addVideoUrlToVideo(videoUUID, videoUrlData.data.videoUrl)
		} catch (error) {
			console.error(error)
		} finally {
			videoClass.setIsRetrievingVideoUrl(false)
		}
	}, [fortunaApiClient.videoDataService, videoClass, videoUUID])

	useEffect(() => {
		void retrieveVideoUrlData()
	}, [retrieveVideoUrlData])
}
