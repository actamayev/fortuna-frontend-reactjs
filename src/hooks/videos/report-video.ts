import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../contexts/video-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useReportVideo(): (
	video: UrlExtendedSingleVideoData,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const videoClass = useVideoContext()

	return useCallback(async (
		video: UrlExtendedSingleVideoData,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				video.isUserAbleToAccessVideo === false
			) return
			setIsLoading(true)
			const likeResponse = await fortunaApiClient.videoDataService.reportVideo(video.videoId)

			if (!_.isEqual(likeResponse.status, 200) || isNonSuccessResponse(likeResponse.data)) {
				throw new Error("Like failed")
			}
			videoClass.updateVideoDetailsAfterLikeOrRemoveLike(video.uuid)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.videoDataService, videoClass])
}
