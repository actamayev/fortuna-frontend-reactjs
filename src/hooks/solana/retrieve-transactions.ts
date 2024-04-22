import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveTransactions(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	// eslint-disable-next-line complexity
	const retrieveTransactions = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				solanaClass.hasTransactionsToRetrieve === false ||
				solanaClass.isRetrievingTransactions === true ||
				!_.isEmpty(solanaClass.myTransactions)
			) {
				return
			}
			solanaClass.setIsRetrievingTransactions(true)
			const myTransactionsResponse = await fortunaApiClient.solanaDataService.retrieveTransactions()
			if (
				!_.isEqual(myTransactionsResponse.status, 200) ||
				isMessageResponse(myTransactionsResponse.data) ||
				isErrorResponse(myTransactionsResponse.data)
			) {
				return
			}

			solanaClass.setTransactions(myTransactionsResponse.data.transactions)
			solanaClass.setHasTransactionsToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingTransactions(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, solanaClass])

	return retrieveTransactions
}
