import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useExchangeContext } from "../../contexts/exchange-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyContent(): void {
	const fortunaApiClient = useApiClientContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyContent = useCallback(async () => {
		try {
			if (
				_.isNull(exchangeClass) ||
				personalInfoClass?.isApprovedToBeCreator !== true ||
				exchangeClass.hasContentToRetrieve === false ||
				exchangeClass.isRetrievingContent === true ||
				!_.isEmpty(exchangeClass.myContent)
			) return
			exchangeClass.setIsRetrievingContent(true)
			const myContentResponse = await fortunaApiClient.solanaDataService.retrieveMyContent()

			if (
				!_.isEqual(myContentResponse.status, 200) ||
				isMessageResponse(myContentResponse.data) ||
				isErrorResponse(myContentResponse.data)
			) return

			exchangeClass.setContent(myContentResponse.data.creatorContentList)
			exchangeClass.setHasContentToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(exchangeClass)) exchangeClass.setIsRetrievingContent(false)
		}
	}, [exchangeClass, fortunaApiClient.solanaDataService, personalInfoClass?.isApprovedToBeCreator])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyContent()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyContent])
}
