import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSplTokenBid(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const splTokenBid = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> =>  {
		try {
			if (_.isNull(exchangeClass) || _.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
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
			exchangeClass.addOrderToBeginning(bidResponse.data.bidOrderData)

			if (_.isEqual(
				bidResponse.data.bidOrderData.numberOfSharesBiddingFor,
				bidResponse.data.bidOrderData.remainingNumberOfSharesBiddingFor)
			) {
				return
			}

			let purchaseValueUsd = 0
			bidResponse.data.transactionsMap.map(transaction => {
				purchaseValueUsd += transaction.fillPriceUsd * transaction.numberOfShares
			})
			solanaClass.alterWalletBalanceUsd(-purchaseValueUsd)
			const mappedTransactions = bidResponse.data.transactionsMap.map(transaction => ({
				numberOfShares: transaction.numberOfShares,
				purchasePricePerShareUsd: transaction.fillPriceUsd
			}))
			exchangeClass.incremenetOwnership(bid.splPublicKey, mappedTransactions)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, solanaClass, fortunaApiClient.exchangeDataService, fortunaApiClient.httpClient.accessToken])

	return splTokenBid
}
