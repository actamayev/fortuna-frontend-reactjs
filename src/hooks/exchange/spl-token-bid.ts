import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import useRetrieveWalletBalance from "../solana/wallet-balance/retrieve-wallet-balance"

export default function useBidForSecondarySplTokens(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

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

			const bidResponse = await fortunaApiClient.exchangeDataService.placeSplBid(bid)

			if (isNonSuccessResponse(bidResponse.data)) {
				throw Error("Unable to place SPL bid")
			}

			exchangeClass.resetSplBidDetails()

			if (_.isEqual(bidResponse.status, 200)) {
				// This is if the bid is added, but there aren't any matching asks.
				// In this situation, add the bid to the user's open orders.
			} else if (_.isEqual(bidResponse.status, 201)) {
				// This is if the bid is added, and at least one share is transferred.
				// in this situation, update the user's ownership, add to orders/open orders
				await retrieveWalletBalance()
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken, retrieveWalletBalance])

	return purchaseSecondarySplTokens
}
