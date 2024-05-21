import _ from "lodash"
import { useCallback } from "react"
import { useExchangeContext } from "../../contexts/exchange-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyOwnership(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyOwnership = useCallback(async () => {
		try {
			if (
				_.isNull(exchangeClass) ||
				_.isNil(personalInfoClass?.username) ||
				exchangeClass.hasOwnershipToRetrieve === false ||
				exchangeClass.isRetrievingOwnership === true ||
				!_.isEmpty(exchangeClass.myOwnership)
			) return
			exchangeClass.setIsRetrievingOwnership(true)
			const myOwnershipResponse = await fortunaApiClient.solanaDataService.retrieveMyOwnership()

			if (
				!_.isEqual(myOwnershipResponse.status, 200) ||
				isMessageResponse(myOwnershipResponse.data) ||
				isErrorResponse(myOwnershipResponse.data)
			) return

			exchangeClass.setMyOwnership(myOwnershipResponse.data.myOwnershipList)
			exchangeClass.setHasOwnershipToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(exchangeClass)) exchangeClass.setIsRetrievingOwnership(false)
		}
	}, [exchangeClass, fortunaApiClient.solanaDataService, personalInfoClass?.username])

	return retrieveMyOwnership
}
