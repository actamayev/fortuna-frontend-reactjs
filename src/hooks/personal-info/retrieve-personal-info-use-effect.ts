import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrievePersonalInfoUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const retrievePersonalInfo = useCallback(async () => {
		try {
			if (
				_.isNull(personalInfoClass) ||
				personalInfoClass.isRetrievingPersonalInfo === true ||
				_.isNull(fortunaApiClient.httpClient.accessToken)
			) return

			personalInfoClass.setIsRetrievingPersonalDetails(true)

			const personalInfoResponse = await fortunaApiClient.personalInfoDataService.retrievePersonalInfo()
			if (!_.isEqual(personalInfoResponse.status, 200) || isErrorResponse(personalInfoResponse.data)) {
				throw Error ("Unable to retrieve personal info")
			}
			personalInfoClass.setRetrievedPersonalData(personalInfoResponse.data)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(personalInfoClass)) personalInfoClass.setIsRetrievingPersonalDetails(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.isRetrievingPersonalInfo,
		fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService])

	useEffect(() => {
		void retrievePersonalInfo()
	}, [retrievePersonalInfo])
}
