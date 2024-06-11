import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useMarketContext } from "../../contexts/market-context"
import useRetrieveWalletBalance from "../solana/retrieve-wallet-balance"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import getTieredAccessPriceUsd from "../../utils/video-access-tiers/get-tiered-access-price-usd"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function usePurchaseExclusiveContentAccess(): (
	videoUUID: string,
	tierNumber: number,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const marketClass = useMarketContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	// eslint-disable-next-line complexity
	const purchaseInstantAccess = useCallback(async (
		videoUUID: string,
		tierNumber: number,
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
			const purchaseResponse = await fortunaApiClient.marketDataService.purchaseExclusiveContentAccess(videoUUID, tierNumber)
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
			const tierAccessPriceUsd = getTieredAccessPriceUsd(video)
			if (_.isNull(tierAccessPriceUsd)) {
				await retrieveWalletBalance()
			} else {
				solanaClass.alterWalletBalanceUsd(-tierAccessPriceUsd)
			}
			videoClass.updateVideoDetailsAfterUserPurchase(videoUUID, purchaseResponse.data.isVideoSoldOut)
			// ASAP TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseExclusiveContentAccess response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [marketClass, solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.marketDataService,
		positionsAndTransactionsClass, videoClass, retrieveWalletBalance])

	return purchaseInstantAccess
}
