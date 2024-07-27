import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useRetrieveTransactions(): () => Promise<void> {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const fortunaApiClient = useApiClientContext()

	return useCallback(async () => {
		try {
			if (
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				positionsAndTransactionsClass.hasTransactionsToRetrieve === false ||
				positionsAndTransactionsClass.isRetrievingTransactions === true ||
				!_.isEmpty(positionsAndTransactionsClass.mySolanaTransactions)
			) {
				return
			}
			positionsAndTransactionsClass.setIsRetrievingTransactions(true)
			const mySolanaTransactionsResponse = await fortunaApiClient.positionsAndTransactionsDataService.getSolanaTransactions()
			if (
				!_.isEqual(mySolanaTransactionsResponse.status, 200) ||
				isMessageResponse(mySolanaTransactionsResponse.data) ||
				isErrorResponse(mySolanaTransactionsResponse.data)
			) {
				return
			}

			positionsAndTransactionsClass.setTransactions(mySolanaTransactionsResponse.data.transactions)
			positionsAndTransactionsClass.setHasTransactionsToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			positionsAndTransactionsClass.setIsRetrievingTransactions(false)
		}
	}, [positionsAndTransactionsClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.positionsAndTransactionsDataService])
}
