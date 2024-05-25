import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useRetrieveMyOwnership(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyOwnership = useCallback(async () => {
		try {
			if (
				_.isNull(positionsAndTransactionsClass) ||
				_.isNil(personalInfoClass?.username) ||
				positionsAndTransactionsClass.hasOwnershipToRetrieve === false ||
				positionsAndTransactionsClass.isRetrievingOwnership === true ||
				!_.isEmpty(positionsAndTransactionsClass.myOwnership)
			) return
			positionsAndTransactionsClass.setIsRetrievingOwnership(true)
			const myOwnershipResponse = await fortunaApiClient.positionsAndTransactionsDataService.retrieveMyOwnership()

			if (
				!_.isEqual(myOwnershipResponse.status, 200) ||
				isMessageResponse(myOwnershipResponse.data) ||
				isErrorResponse(myOwnershipResponse.data)
			) return

			positionsAndTransactionsClass.setMyOwnership(myOwnershipResponse.data.myOwnershipList)
			positionsAndTransactionsClass.setHasOwnershipToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(positionsAndTransactionsClass)) positionsAndTransactionsClass.setIsRetrievingOwnership(false)
		}
	}, [positionsAndTransactionsClass, personalInfoClass?.username, fortunaApiClient.positionsAndTransactionsDataService])

	return retrieveMyOwnership
}
