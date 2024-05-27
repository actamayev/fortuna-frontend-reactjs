import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useRetrieveMyContentUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyContent = useCallback(async () => {
		try {
			if (
				_.isNull(positionsAndTransactionsClass) ||
				personalInfoClass?.isApprovedToBeCreator !== true ||
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
	}, [positionsAndTransactionsClass, personalInfoClass?.isApprovedToBeCreator, fortunaApiClient.positionsAndTransactionsDataService])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyContent()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyContent])
}
