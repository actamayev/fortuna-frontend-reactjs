import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isErrorResponses, isNonSuccessResponse } from "../../utils/type-checks"

export default function useLikeVideo(): (
	video: SingleVideoDataFromBackend,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const videoClass = useVideoContext()

	return useCallback(async (
		video: SingleVideoDataFromBackend,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				video.isUserAbleToAccessVideo === false
			) return
			setIsLoading(true)
			if (video.userLikeStatus === false)  {
				const likeResponse = await fortunaApiClient.videoDataService.likeVideo(video.uuid)

				if (!_.isEqual(likeResponse.status, 200) || isNonSuccessResponse(likeResponse.data)) {
					throw new Error("Like failed")
				}
			} else {
				const removeLikeResponse = await fortunaApiClient.videoDataService.removeLikeFromVideo(video.uuid)
				if (!_.isEqual(removeLikeResponse.status, 200) || isErrorResponses(removeLikeResponse.data)) {
					throw new Error("Removal of like failed")
				}
			}
			videoClass.updateVideoDetailsAfterLikeOrRemoveLike(video.uuid)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.videoDataService, videoClass])
}
