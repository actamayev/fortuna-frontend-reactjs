import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetSingleVideoUseEffect(
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
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				throw new Error("Failed to retrieve video")
			}
			videoClass.addVideoToVideosList(response.data.videoData)
		} catch (error) {
			console.error(error)
			setIsVideoNotFound(true)
		} finally {
			setIsVideoLoading(false)
			videoClass.removeVideoUUIDFromRetrievingList(videoUUID)
		}
	}, [fortunaApiClient.videoDataService, setIsVideoLoading, setIsVideoNotFound, videoUUID, videoClass])

	useEffect(() => {
		const video = videoClass.findVideoFromUUID(videoUUID)
		if (!_.isUndefined(video)) return

		void retrieveVideo()
	}, [retrieveVideo, videoUUID, videoClass])
}
