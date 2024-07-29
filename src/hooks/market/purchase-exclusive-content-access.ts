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
import useConfirmSufficientFundsForInstantAccess from "../solana/confirm-sufficient-funds-for-instant-access"

export default function usePurchaseExclusiveContentAccess(): (
	video: UrlExtendedSingleVideoData,
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
	const confirmSufficientFundsForInstantAccess = useConfirmSufficientFundsForInstantAccess()

	return useCallback(async (
		video: UrlExtendedSingleVideoData,
		tierNumber: number,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (_.isNull(fortunaApiClient.httpClient.accessToken)) return

			const doesUserHaveSufficientFunds = confirmSufficientFundsForInstantAccess(video.uuid)
			if (doesUserHaveSufficientFunds === false) return
			setIsLoading(true)
			const purchaseResponse = await fortunaApiClient.marketDataService.purchaseExclusiveContentAccess(video.videoId, tierNumber)
			if (!_.isEqual(purchaseResponse.status, 200) || isNonSuccessResponse(purchaseResponse.data)) {
				throw Error ("Error completing exclusive content purchase")
			}
			videoClass.addVideoUrlToVideo(video.uuid, purchaseResponse.data.videoUrl)

			positionsAndTransactionsClass.addExclusiveContent({ ...video, ...purchaseResponse.data })
			notificationClass.setSuperPositiveNotification("Successfully purchased access to video. Enjoy!")
			videoClass.updateVideoDetailsAfterUserPurchase(
				video.uuid,
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
		} catch (error) {
			console.error(error)
			notificationClass.setNegativeNotification("Unable to purchase access to video at this time. Please reload page and try again")
		} finally {
			setIsLoading(false)
		}
	}, [marketClass, solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.marketDataService,
		positionsAndTransactionsClass, confirmSufficientFundsForInstantAccess, videoClass, retrieveWalletBalance, notificationClass])
}
