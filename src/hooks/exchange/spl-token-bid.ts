import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import useRetrieveWalletBalance from "../solana/wallet-balance/retrieve-wallet-balance"

export default function useSplTokenBid(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	const splTokenBid = useCallback(async (
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

			if (!_.isEqual(bidResponse.status, 200) || isNonSuccessResponse(bidResponse.data)) {
				throw Error("Unable to place SPL bid")
			}

			exchangeClass.resetSplBidDetails()
			exchangeClass.addOrder(bidResponse.data.bidOrderData)

			if (_.isEqual(
				bidResponse.data.bidOrderData.numberOfSharesBiddingFor,
				bidResponse.data.bidOrderData.remainingNumberOfSharesBiddingFor)
			) {
				return
			}
			await retrieveWalletBalance()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken, retrieveWalletBalance])

	return splTokenBid
}
