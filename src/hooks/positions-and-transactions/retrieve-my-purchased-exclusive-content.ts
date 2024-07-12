import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useRetrieveMyPurchasedExclusiveContent(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	return useCallback(async () => {
		if (_.isNull(positionsAndTransactionsClass)) return
		try {
			if (
				_.isNil(personalInfoClass?.username) ||
				positionsAndTransactionsClass.hasPurchasedExclusiveContentToRetrieve === false ||
				positionsAndTransactionsClass.isRetrievingPurchasedExclusiveContent === true
			) return
			positionsAndTransactionsClass.setIsRetrievingOwnership(true)
			const myOwnershipResponse = await fortunaApiClient.positionsAndTransactionsDataService.retrieveMyPurchasedExclusiveContent()

			if (
				!_.isEqual(myOwnershipResponse.status, 200) ||
				isMessageResponse(myOwnershipResponse.data) ||
				isErrorResponse(myOwnershipResponse.data)
			) return

			positionsAndTransactionsClass.setExclusiveContent(myOwnershipResponse.data.myPurchasedExclusiveContent)
			positionsAndTransactionsClass.setHasOwnershipToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			positionsAndTransactionsClass.setIsRetrievingOwnership(false)
		}
	}, [positionsAndTransactionsClass, personalInfoClass?.username, fortunaApiClient.positionsAndTransactionsDataService])
}
