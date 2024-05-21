import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import useRetrieveWalletBalance from "../solana/wallet-balance/retrieve-wallet-balance"

export default function useSplTokenAsk(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	const splTokenAsk = useCallback(async (
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

			if (!_.isEqual(askResponse.status, 200) || isNonSuccessResponse(askResponse.data)) {
				throw Error("Unable to place SPL ask")
			}

			exchangeClass.resetSplAskDetails()
			exchangeClass.addOrder(askResponse.data.askOrderData)

			if (_.isEqual(
				askResponse.data.askOrderData.numberOfsharesForSale,
				askResponse.data.askOrderData.remainingNumberOfSharesForSale)
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

	return splTokenAsk
}
