import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import useRetrieveWalletBalance from "../solana/wallet-balance/retrieve-wallet-balance"

export default function useAskSecondarySplTokens(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	const askSecondarySplTokens = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> =>  {
		try {
			if (_.isNull(exchangeClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsLoading(true)

			const ask: CreateSPLAskData = {
				splPublicKey: exchangeClass.askForSplSharesDetails.splPublicKey,
				numberOfSharesAskingFor: exchangeClass.askForSplSharesDetails.numberofSharesAskingFor,
				askPricePerShareUsd: exchangeClass.askForSplSharesDetails.askPricePerShareUsd
			}

			const askResponse = await fortunaApiClient.exchangeDataService.placeSplAsk(ask)

			if (isNonSuccessResponse(askResponse.data)) {
				throw Error("Unable to place SPL ask")
			}

			exchangeClass.resetSplAskDetails()

			if (_.isEqual(askResponse.status, 200)) {
				// This is if the ask is added, but there aren't any matching bids.
				// In this situation, add the ask to the user's open orders.
			} else if (_.isEqual(askResponse.status, 201)) {
				// This is if the ask is added, and at least one share is transferred.
				// eslint-disable-next-line max-len
				// in this situation, update the user's ownership, add to orders/open orders (will need to check if all the shares found a match or not)
				await retrieveWalletBalance()
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken, retrieveWalletBalance])

	return askSecondarySplTokens
}
