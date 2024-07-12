import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useRetrieveTransactions(): () => Promise<void> {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const fortunaApiClient = useApiClientContext()

	return useCallback(async () => {
		if (_.isNull(positionsAndTransactionsClass)) return
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				positionsAndTransactionsClass.hasTransactionsToRetrieve === false ||
				positionsAndTransactionsClass.isRetrievingTransactions === true ||
				!_.isEmpty(positionsAndTransactionsClass.myTransactions)
			) {
				return
			}
			positionsAndTransactionsClass.setIsRetrievingTransactions(true)
			const myTransactionsResponse = await fortunaApiClient.positionsAndTransactionsDataService.retrieveTransactions()
			if (
				!_.isEqual(myTransactionsResponse.status, 200) ||
				isMessageResponse(myTransactionsResponse.data) ||
				isErrorResponse(myTransactionsResponse.data)
			) {
				return
			}

			positionsAndTransactionsClass.setTransactions(myTransactionsResponse.data.transactions)
			positionsAndTransactionsClass.setHasTransactionsToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			positionsAndTransactionsClass.setIsRetrievingTransactions(false)
		}
	}, [positionsAndTransactionsClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.positionsAndTransactionsDataService])
}
