import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useAskSecondarySplTokens(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()

	const askSecondarySplTokens = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> =>  {
		try {
			if (_.isNull(exchangeClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsLoading(true)

			const ask: CreateSPLAskData = {
				splPublicKey: exchangeClass.asForSplSharesDetails.splPublicKey,
				numberOfSharesAskingFor: exchangeClass.asForSplSharesDetails.numberofSharesAskingFor,
				askPricePerShareUsd: exchangeClass.asForSplSharesDetails.askPricePerShareUsd
			}

			const askResponse = await fortunaApiClient.exchangeDataService.placeSecondaryMarketSplAsk(ask)

			if (!_.isEqual(askResponse.status, 200) || isNonSuccessResponse(askResponse.data)) {
				throw Error("Unable to place SPL ask")
			}

			// TODO: Check if it's a success response. if it is, add only to the user's open orders list.
			// If it's status is 200, but not a 'succcess' response, add the results to both the user's open orders and ownership
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken])

	return askSecondarySplTokens
}
