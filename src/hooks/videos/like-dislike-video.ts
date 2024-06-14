import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isErrorResponses, isNonSuccessResponse } from "../../utils/type-checks"

export default function useLikeDislikeVideo(): (
	video: SingleVideoDataFromBackend,
	newLikeStatus: boolean
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const videoClass = useVideoContext()

	const likeDislikeVideo = useCallback(async (
		video: SingleVideoDataFromBackend,
		newLikeStatus: boolean
	) => {
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				video.isUserAbleToAccessVideo === false
			) return
			if (_.isNull(video.userLikeStatus) || newLikeStatus !== video.userLikeStatus)  {
				const likeDislikeResponse = await fortunaApiClient.videoDataService.likeOrDislikeVideo(video.uuid, newLikeStatus)

				if (!_.isEqual(likeDislikeResponse.status, 200) || isNonSuccessResponse(likeDislikeResponse.data)) {
					throw new Error("Like/Dislike failed")
				}
			} else {
				const removeLikeOrDislikeResponse = await fortunaApiClient.videoDataService.removeLikeOrDislikeFromVideo(video.uuid)
				if (!_.isEqual(removeLikeOrDislikeResponse.status, 200) || isErrorResponses(removeLikeOrDislikeResponse.data)) {
					throw new Error("Removal of like/dislike failed")
				}

			}
			videoClass.updateVideoDetailsAfterLikeDislike(video.uuid, newLikeStatus)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.videoDataService, videoClass])

	return likeDislikeVideo
}
