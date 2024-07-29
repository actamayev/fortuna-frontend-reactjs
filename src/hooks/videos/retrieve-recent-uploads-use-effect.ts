import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveRecentUploadsUseEffect(): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveRecentUploads = useCallback(async (): Promise<void> => {
		try {
			if (
				videoClass.areRecentlyUploadedVideosRetrieved === true ||
				videoClass.areRecentlyUploadedBeingRetrieved === true
			) return
			videoClass.areRecentlyUploadedVideosRetrieved = false
			videoClass.areRecentlyUploadedBeingRetrieved = true
			const response = await fortunaApiClient.videoDataService.getRecentlyUploadedVideos()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to retrieve video")
			}
			videoClass.areRecentlyUploadedVideosRetrieved = true
			const videos = response.data.recentlyPostedVideos.map(video => ({
				...video,
				videoUrlRetrievalAttempted: false
			}))
			videoClass.setRecentlyUploadedVideos(videos)
		} catch (error) {
			console.error(error)
		} finally {
			videoClass.areRecentlyUploadedBeingRetrieved = false
		}
	}, [videoClass, fortunaApiClient.videoDataService])

	useEffect(() => {
		void retrieveRecentUploads()
	}, [fortunaApiClient.httpClient.accessToken, retrieveRecentUploads])
}
