import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useExchangeContext } from "../../contexts/exchange-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function usePurchaseInstantAccess(): (
	videoUUID: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const fortunaApiClient = useApiClientContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const purchaseInstantAccess = useCallback(async (
		videoUUID: string,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (
				_.isNull(exchangeClass) ||
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				_.isNull(positionsAndTransactionsClass)
			) return
			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isUndefined(video)) return
			setIsLoading(true)
			const purchaseResponse = await fortunaApiClient.exchangeDataService.purchaseExclusiveContentAccess(videoUUID)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error completing primary SPL purchase")
			}
			videoClass.addVideoUrlToVideo(videoUUID, purchaseResponse.data.videoUrl)
			const exclusiveContentToAddToList: MyExclusiveContentData = {
				splName: video.splName,
				imageUrl: video.imageUrl,
				uuid: video.uuid
			}
			positionsAndTransactionsClass.addExclusiveContent(exclusiveContentToAddToList)
			exchangeClass.setInstantAccessToExclusiveContentStage("initial")
			if (_.isNull(video.instantAccessPriceToExclusiveContentUsd)) return
			solanaClass.alterWalletBalanceUsd(-video.instantAccessPriceToExclusiveContentUsd)
			// FUTURE TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseSplTokens response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [exchangeClass, solanaClass, positionsAndTransactionsClass, videoClass,
		fortunaApiClient.httpClient.accessToken, fortunaApiClient.exchangeDataService])

	return purchaseInstantAccess
}
