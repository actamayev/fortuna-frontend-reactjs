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

	const retrieveHomePageVideos = useCallback(async (): Promise<void> => {
		try {
			if (videoClass.areHomePageVideoRetrieved === true) return
			setAreVideosLoading(true)
			videoClass.setAreHomePageVideosRetrieved(false)
			const response = await fortunaApiClient.videoDataService.getHomePageVideos()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to retrieve video")
			}
			videoClass.setAreHomePageVideosRetrieved(true)
			videoClass.setHomePageVideos(response.data.homePageVideos)
		} catch (error) {
			console.error(error)
		} finally {
			setAreVideosLoading(false)
		}
	}, [fortunaApiClient.videoDataService, setAreVideosLoading, videoClass])

	useEffect(() => {
		void retrieveHomePageVideos()
	}, [fortunaApiClient.httpClient.accessToken, retrieveHomePageVideos, videoClass])
}
