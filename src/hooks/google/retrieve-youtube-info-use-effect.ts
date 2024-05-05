import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useYoutTubeContext } from "../../contexts/youtube-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveYouTubeInfoUseEffect(): void {
	const youTubeClass = useYoutTubeContext()
	const fortunaApiClient = useApiClientContext()

	const retrieveYouTubeInfo = useCallback(async () => {
		try {
			if (
				_.isNull(youTubeClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				youTubeClass.hasYouTubeDataBeenRetrieved === true
			) {
				return
			}
			const youTubeData = await fortunaApiClient.youTubeDataService.getUserYouTubeInfo()
			if (!_.isEqual(youTubeData.status, 200) || isErrorResponse(youTubeData.data)) {
				return
			}
			youTubeClass.setYouTubeClassData(youTubeData.data)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.youTubeDataService, youTubeClass])

	useEffect(() => {
		void retrieveYouTubeInfo()
	}, [retrieveYouTubeInfo])
}
