import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveVideosByTagUseEffect(hashtag: string | undefined): void {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveVideosByTag = useCallback(async () => {
		try {
			if (
				_.isUndefined(hashtag) ||
				_.isEmpty(hashtag) ||
				videoClass.isCurrentlySearchingHashtag === true ||
				!_.isUndefined(videoClass.contextForHashtagMap(hashtag))
			) return
			videoClass.setIsCurrentlySearchingHashtag(true)

			const hashtagSearchData = await fortunaApiClient.searchDataService.getVideosByTag(hashtag)

			if (!_.isEqual(hashtagSearchData.status, 200) || isNonSuccessResponse(hashtagSearchData.data)) {
				throw Error("Unable to retrieve hashtag seaarch data")
			}
			videoClass.setIsCurrentlySearchingHashtag(false)
			const videos = hashtagSearchData.data.transformedVideoTagData.map(video => ({
				...video,
				videoUrlRetrievalAttempted: false
			}))
			videoClass.setHashtagMapData(hashtag, videos)
		} catch (error) {
			console.error(error)
		} finally {
			videoClass.setIsCurrentlySearchingHashtag(false)
		}
	}, [hashtag, videoClass, fortunaApiClient.searchDataService])

	useEffect(() => {
		void retrieveVideosByTag()
	}, [retrieveVideosByTag])
}
