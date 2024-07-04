import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveCreatorInfoUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const creatorClass = useCreatorContext()

	const retrievePersonalInfo = useCallback(async () => {
		try {
			if (
				_.isNull(creatorClass) ||
				creatorClass.isRetrievingCreatorInfo === true ||
				_.isNull(fortunaApiClient.httpClient.accessToken)
			) return

			creatorClass.setIsRetrievingCreatorInfo(true)

			const creatorInfoResponse = await fortunaApiClient.creatorDataService.retrieveCreatorInfo()
			if (!_.isEqual(creatorInfoResponse.status, 200) || isErrorResponse(creatorInfoResponse.data)) {
				throw Error ("Unable to retrieve creator info")
			}
			creatorClass.setRetrievedCreatorInfo(creatorInfoResponse.data)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(creatorClass)) creatorClass.setIsRetrievingCreatorInfo(false)
		}
	}, [creatorClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.creatorDataService])

	useEffect(() => {
		void retrievePersonalInfo()
	}, [retrievePersonalInfo])
}
