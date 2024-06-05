import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useRetrieveMyContentUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	// eslint-disable-next-line complexity
	const retrieveMyContent = useCallback(async () => {
		try {
			if (
				_.isNull(positionsAndTransactionsClass) ||
				positionsAndTransactionsClass.hasContentToRetrieve === false ||
				positionsAndTransactionsClass.isRetrievingContent === true ||
				!_.isEmpty(positionsAndTransactionsClass.myContent)
			) return
			positionsAndTransactionsClass.setIsRetrievingContent(true)
			const myContentResponse = await fortunaApiClient.positionsAndTransactionsDataService.retrieveMyContent()

			if (
				!_.isEqual(myContentResponse.status, 200) ||
				isMessageResponse(myContentResponse.data) ||
				isErrorResponse(myContentResponse.data)
			) return

			positionsAndTransactionsClass.setContent(myContentResponse.data.creatorContentList)
			positionsAndTransactionsClass.setHasContentToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(positionsAndTransactionsClass)) positionsAndTransactionsClass.setIsRetrievingContent(false)
		}
	}, [positionsAndTransactionsClass, fortunaApiClient.positionsAndTransactionsDataService])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyContent()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyContent])
}
