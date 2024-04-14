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
			if (_.isUndefined(videoUUID)) return
			setIsVideoLoading(true)
			setIsVideoNotFound(false)
			const response = await fortunaApiClient.videoDataService.getVideoById(videoUUID)
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to retrieve video")
			}
			videoClass.addVideoToMap(response.data.video)
		} catch (error) {
			console.error(error)
			setIsVideoNotFound(true)
		} finally {
			setIsVideoLoading(false)
		}
	}, [fortunaApiClient.videoDataService, setIsVideoLoading, setIsVideoNotFound, videoClass, videoUUID])

	useEffect(() => {
		if (
			_.isUndefined(videoUUID) ||
			_.isNull(fortunaApiClient.httpClient.accessToken)
		) return

		const video = videoClass.contextForVideo(videoUUID)
		if (_.isUndefined(video)) {
			void retrieveVideo()
			return
		}
	}, [fortunaApiClient.httpClient.accessToken, retrieveVideo, videoClass, videoUUID])
}
