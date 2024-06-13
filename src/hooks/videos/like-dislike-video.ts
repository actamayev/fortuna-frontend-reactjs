import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isErrorResponses, isNonSuccessResponse } from "../../utils/type-checks"

export default function useLikeDislikeVideo(): (
	videoId: number,
	newLikeStatus: boolean,
	previousUserLikeStatus: boolean | null
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const videoClass = useVideoContext()

	const likeDislikeVideo = useCallback(async (
		videoId: number,
		newLikeStatus: boolean,
		previousUserLikeStatus: boolean | null
	) => {
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				newLikeStatus === previousUserLikeStatus
			) return
			videoClass.updateVideoDetailsAfterLikeDislike(videoId, newLikeStatus)
			if (
				_.isNull(previousUserLikeStatus) || newLikeStatus === previousUserLikeStatus
			)  {
				const likeDislikeResponse = await fortunaApiClient.videoDataService.likeOrDislikeVideo(videoId, newLikeStatus)

				if (!_.isEqual(likeDislikeResponse.status, 200) || isNonSuccessResponse(likeDislikeResponse.data)) {
					throw new Error("Like/Dislike failed")
				}
			} else {
				const removeLikeOrDislikeResponse = await fortunaApiClient.videoDataService.removeLikeOrDislikeFromVideo(videoId)
				if (!_.isEqual(removeLikeOrDislikeResponse.status, 200) || isErrorResponses(removeLikeOrDislikeResponse.data)) {
					throw new Error("Removal of like/dislike failed")
				}

			}
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.videoDataService, videoClass])

	return likeDislikeVideo
}
