import _ from "lodash"
import { useCallback } from "react"
import useRetrieveMyOwnership from "./retrieve-my-ownership"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSplTokenAsk(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const retrieveMyOwnership = useRetrieveMyOwnership()

	const splTokenAsk = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> =>  {
		try {
			if (_.isNull(exchangeClass) || _.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
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
			exchangeClass.addOrderToBeginning(askResponse.data.askOrderData)

			if (_.isEqual(
				askResponse.data.askOrderData.numberOfsharesForSale,
				askResponse.data.askOrderData.remainingNumberOfSharesForSale)
			) {
				return
			}

			let saleValueUsd = 0
			askResponse.data.transactionsMap.map(transaction => {
				saleValueUsd += transaction.fillPriceUsd * transaction.numberOfShares
			})
			solanaClass.alterWalletBalanceUsd(saleValueUsd)
			await retrieveMyOwnership()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.exchangeDataService, retrieveMyOwnership])

	return splTokenAsk
}
