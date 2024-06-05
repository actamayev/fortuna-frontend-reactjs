import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"
import { useMarketContext } from "../../../contexts/market-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

export default function usePurchasePrimarySplTokens(): (
	videoUUID: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const videoClass = useVideoContext()
	const marketClass = useMarketContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()

	const purchasePrimarySplTokens = useCallback(async (
		videoUUID: string,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (
				_.isNull(marketClass) ||
				_.isNull(positionsAndTransactionsClass) ||
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken)
			) return
			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isUndefined(video)) return
			setIsLoading(true)
			const purchaseSplTokensData: PurchaseSplTokensData = {
				numberOfTokensPurchasing: marketClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing,
				splPublicKey: marketClass.purchasePrimarySplSharesDetails.splPublicKey
			}
			const purchaseResponse = await fortunaApiClient.marketDataService.primarySplTokenPurchase(purchaseSplTokensData)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error completing primary SPL purchase")
			}
			positionsAndTransactionsClass.addOwnership(purchaseResponse.data)

			videoClass.tokenPurchaseUpdateAvailableShares(videoUUID, purchaseSplTokensData.numberOfTokensPurchasing)
			if (!_.isUndefined(purchaseResponse.data.videoUrl)) videoClass.addVideoUrlToVideo(videoUUID, purchaseResponse.data.videoUrl)

			marketClass.resetPurchaseSplSharesDetails()
			const purchaseValue = purchaseSplTokensData.numberOfTokensPurchasing * video.listingSharePriceUsd
			solanaClass.alterWalletBalanceUsd(-purchaseValue)
			// FUTURE TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseSplTokens response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [marketClass, positionsAndTransactionsClass, solanaClass,
		fortunaApiClient.httpClient.accessToken, fortunaApiClient.marketDataService, videoClass])

	return purchasePrimarySplTokens
}
