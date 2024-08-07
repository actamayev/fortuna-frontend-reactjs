import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveCreatorInfoUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const creatorClass = useCreatorContext()

	const retrieveCreatorInfo = useCallback(async () => {
		try {
			if (
				creatorClass.isRetrievingCreatorInfo === true ||
				_.isNull(fortunaApiClient.httpClient.accessToken)
			) return

			creatorClass.setIsRetrievingCreatorInfo(true)

			const creatorInfoResponse = await fortunaApiClient.creatorDataService.getCreatorInfo()
			if (!_.isEqual(creatorInfoResponse.status, 200) || isErrorResponse(creatorInfoResponse.data)) {
				throw Error ("Unable to retrieve creator info")
			}
			creatorClass.setRetrievedCreatorInfo(creatorInfoResponse.data)
		} catch (error) {
			console.error(error)
		} finally {
			creatorClass.setIsRetrievingCreatorInfo(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass.isRetrievingCreatorInfo, fortunaApiClient.httpClient.accessToken, fortunaApiClient.creatorDataService])

	useEffect(() => {
		void retrieveCreatorInfo()
	}, [retrieveCreatorInfo])
}
