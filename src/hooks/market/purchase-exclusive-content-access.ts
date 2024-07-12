import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import { useMarketContext } from "../../contexts/market-context"
import useRetrieveWalletBalance from "../solana/retrieve-wallet-balance"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import getTieredAccessPriceUsd from "../../utils/video-access-tiers/get-tiered-access-price-usd"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"
import useConfirmUserHasSufficientFundsForInstantAccess from "../solana/confirm-user-has-sufficient-funds-for-instant-access"

export default function usePurchaseExclusiveContentAccess(): (
	videoUUID: string,
	tierNumber: number,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const marketClass = useMarketContext()
	const fortunaApiClient = useApiClientContext()
	const notificationClass = useNotificationsContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const confirmUserHasSufficientFundsForInstantAccess = useConfirmUserHasSufficientFundsForInstantAccess()

	// eslint-disable-next-line complexity
	return useCallback(async (
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

			const doesUserHaveSufficientFunds = confirmUserHasSufficientFundsForInstantAccess(videoUUID)
			if (doesUserHaveSufficientFunds === false) return
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
			notificationClass.setSuperPositiveNotification("Successfully purchased access to video. Enjoy!")
			videoClass.updateVideoDetailsAfterUserPurchase(
				videoUUID,
				tierNumber,
				purchaseResponse.data.isTierSoldOut,
				purchaseResponse.data.isVideoSoldOut
			)
			marketClass.setInstantAccessToExclusiveContentStage("initial")
			const tierAccessPriceUsd = getTieredAccessPriceUsd(video)
			if (_.isNull(tierAccessPriceUsd)) {
				await retrieveWalletBalance()
			} else {
				solanaClass.alterWalletBalanceUsd(-tierAccessPriceUsd)
			}
			// TODO: Add this transaction to my transactions (don't just call retrieveTransactions - redundant)
			// Consider returning the sol transfer details with the purchaseExclusiveContentAccess response.
			// Add that single new transaction to the transaction array
		} catch (error) {
			console.error(error)
			notificationClass.setNegativeNotification("Unable to purchase access to video at this time. Please reload page and try again")
		} finally {
			setIsLoading(false)
		}
	}, [marketClass, solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.marketDataService,
		positionsAndTransactionsClass, confirmUserHasSufficientFundsForInstantAccess, videoClass, retrieveWalletBalance, notificationClass])
}
