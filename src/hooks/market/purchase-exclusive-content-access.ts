import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useMarketContext } from "../../contexts/market-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function usePurchaseExclusiveContentAccess(): (
	videoUUID: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const marketClass = useMarketContext()
	const fortunaApiClient = useApiClientContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const purchaseInstantAccess = useCallback(async (
		videoUUID: string,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (
				_.isNull(marketClass) ||
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				_.isNull(positionsAndTransactionsClass)
			) return
			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isUndefined(video)) return
			setIsLoading(true)
			const purchaseResponse = await fortunaApiClient.marketDataService.purchaseExclusiveContentAccess(videoUUID)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error completing exclusive content purchase")
			}
			videoClass.addVideoUrlToVideo(videoUUID, purchaseResponse.data.videoUrl)
			const exclusiveContentToAddToList: MyPurchasedExclusiveContent = {
				videoName: video.videoName,
				imageUrl: video.imageUrl,
				uuid: video.uuid
			}
			positionsAndTransactionsClass.addExclusiveContent(exclusiveContentToAddToList)
			marketClass.setInstantAccessToExclusiveContentStage("initial")
			solanaClass.alterWalletBalanceUsd(-video.listingPriceToAccessUsd)
			// FUTURE TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseExclusiveContentAccess response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [marketClass, solanaClass, positionsAndTransactionsClass, videoClass,
		fortunaApiClient.httpClient.accessToken, fortunaApiClient.marketDataService])

	return purchaseInstantAccess
}
