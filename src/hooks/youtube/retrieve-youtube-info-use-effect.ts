import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useYouTubeContext } from "../../contexts/youtube-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveYouTubeInfoUseEffect(): void {
	const youtubeClass = useYouTubeContext()
	const personalInfoClass = usePersonalInfoContext()
	const fortunaApiClient = useApiClientContext()

	// eslint-disable-next-line complexity
	const retrieveYouTubeInfo = useCallback(async () => {
		try {
			if (
				_.isNull(youtubeClass) ||
				_.isNil(personalInfoClass?.username) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				youtubeClass.hasYouTubeDataBeenRetrieved === true ||
				youtubeClass.isRetrievingYouTubeData === true
			) {
				return
			}
			youtubeClass.isRetrievingYouTubeData = true
			const youtubeData = await fortunaApiClient.youtubeDataService.getUserYouTubeInfo()
			if (!_.isEqual(youtubeData.status, 200) || isErrorResponse(youtubeData.data)) {
				return
			}
			youtubeClass.setYouTubeClassData(youtubeData.data)
			personalInfoClass.isApprovedToBeCreator = youtubeData.data.isApprovedToBeCreator
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(youtubeClass)) youtubeClass.isRetrievingYouTubeData = false
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [youtubeClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.youtubeDataService, personalInfoClass?.username])

	useEffect(() => {
		void retrieveYouTubeInfo()
	}, [retrieveYouTubeInfo])
}
