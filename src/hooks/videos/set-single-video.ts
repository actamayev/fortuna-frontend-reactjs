import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetSingleVideo(
	videoUUID: string | undefined,
	setIsVideoLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setIsVideoNotFound: React.Dispatch<React.SetStateAction<boolean>>
): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveVideo = useCallback(async (): Promise<void> => {
		try {
			if (_.isUndefined(videoUUID) || videoClass.videosBeingRetrieved.includes(videoUUID)) return
			setIsVideoLoading(true)
			setIsVideoNotFound(false)
			videoClass.addVideoUUIDToRetrievingList(videoUUID)
			const response = await fortunaApiClient.videoDataService.getVideoById(videoUUID)
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to retrieve video")
			}
			videoClass.addVideoToVideosList(response.data.videoData)
		} catch (error) {
			console.error(error)
			setIsVideoNotFound(true)
		} finally {
			setIsVideoLoading(false)
			if (!_.isUndefined(videoUUID)) videoClass.removeVideoUUIDFromRetrievingList(videoUUID)
		}
	}, [fortunaApiClient.videoDataService, setIsVideoLoading, setIsVideoNotFound, videoClass, videoUUID])

	useEffect(() => {
		if (_.isUndefined(videoUUID)) return

		const video = videoClass.findVideoFromUUID(videoUUID)
		if (!_.isUndefined(video)) return

		void retrieveVideo()
	}, [fortunaApiClient.httpClient.accessToken, retrieveVideo, videoClass, videoUUID])
}
