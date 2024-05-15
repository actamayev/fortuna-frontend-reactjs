import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useBidForSecondarySplTokens(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()

	const purchaseSecondarySplTokens = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> =>  {
		try {
			if (_.isNull(exchangeClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsLoading(true)

			const bid: CreateSPLBidData = {
				splPublicKey: exchangeClass.bidForSplSharesDetails.splPublicKey,
				numberOfSharesBiddingFor: exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor,
				bidPricePerShareUsd: exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd
			}

			const bidResponse = await fortunaApiClient.exchangeDataService.placeSecondaryMarketSplBid(bid)

			if (!_.isEqual(bidResponse.status, 200) || isNonSuccessResponse(bidResponse.data)) {
				throw Error("Unable to place SPL bid")
			}

			// TODO: Check if it's a success response. if it is, add only to the user's open orders list.
			// If it's status is 200, but not a 'succcess' response, add the results to both the user's open orders and ownership
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken])

	return purchaseSecondarySplTokens
}
