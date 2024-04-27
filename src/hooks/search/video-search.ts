import _ from "lodash"
import { useCallback} from "react"
import { useVideoContext } from "../../contexts/video-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useVideoSearch(): () => Promise<void> {
	const videoClass = useVideoContext()
	const fortunaApiClient = useApiClientContext()

	const videoSearch = useCallback(async () => {
		try {
			if (
				_.isNull(videoClass.searchTerm) ||
				_.isEmpty(videoClass.searchTerm.trim()) ||
				!_.isUndefined(videoClass.contextForSearchMap(videoClass.searchTerm)) ||
				videoClass.isCurrentlySearching === true
			) return

			videoClass.setIsCurrentlySearching(true)
			const videoSearchResults = await fortunaApiClient.searchDataService.generalSearch(videoClass.searchTerm)
			if (!_.isEqual(videoSearchResults.status, 200) || isNonSuccessResponse(videoSearchResults.data)) {
				throw Error("Unable to retrieve data")
			}
			videoClass.setVideoSearchMapData(videoClass.searchTerm, videoSearchResults.data.searchResults)
		} catch (error) {
			console.error(error)
		} finally {
			videoClass.setIsCurrentlySearching(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fortunaApiClient.searchDataService, videoClass.searchTerm, videoClass.isCurrentlySearching])

	return videoSearch
}
