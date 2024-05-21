import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useExchangeContext } from "../../contexts/exchange-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyOrdersUseEffect(): void {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyOrders = useCallback(async () => {
		try {
			if (
				_.isNull(exchangeClass) ||
				_.isNil(personalInfoClass?.username) ||
				exchangeClass.hasOrdersToRetrieve === false ||
				exchangeClass.isRetrievingOrders === true ||
				!_.isEmpty(exchangeClass.myOrders)
			) return
			exchangeClass.setIsRetrievingOrders(true)
			const myOrdersResponse = await fortunaApiClient.exchangeDataService.retrieveOrders()

			if (
				!_.isEqual(myOrdersResponse.status, 200) ||
				isMessageResponse(myOrdersResponse.data) ||
				isErrorResponse(myOrdersResponse.data)
			) return

			exchangeClass.setMyOrders(myOrdersResponse.data)
			exchangeClass.setHasOrdersToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(exchangeClass)) exchangeClass.setIsRetrievingOrders(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, personalInfoClass?.username])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyOrders()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyOrders])
}
