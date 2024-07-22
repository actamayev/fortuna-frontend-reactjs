import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveHomePageVideos(
	setAreVideosLoading: React.Dispatch<React.SetStateAction<boolean>>
): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveHomePageData = useCallback(async (): Promise<void> => {
		try {
			if (
				videoClass.areHomePageVideosRetrieved === true ||
				videoClass.areHomePageVideosBeingRetrieved === true
			) return
			videoClass.areHomePageVideosRetrieved = false
			videoClass.areHomePageVideosBeingRetrieved = true
			setAreVideosLoading(true)
			const response = await fortunaApiClient.videoDataService.getHomePageData()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to retrieve video")
			}
			videoClass.areHomePageVideosRetrieved = true
			const videos = response.data.homePageVideos.map(video => ({
				...video,
				videoUrlRetrievalAttempted: false
			}))
			videoClass.setHomePageVideos(videos)
		} catch (error) {
			console.error(error)
		} finally {
			setAreVideosLoading(false)
			videoClass.areHomePageVideosBeingRetrieved = false
		}
	}, [videoClass, fortunaApiClient.videoDataService, setAreVideosLoading])

	useEffect(() => {
		void retrieveHomePageData()
	}, [fortunaApiClient.httpClient.accessToken, retrieveHomePageData])
}
