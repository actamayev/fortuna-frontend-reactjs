import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useCalculateMaxSharesToPurchase(): (
	videoUUID: string | undefined
) => number {
	const solanaClass = useSolanaContext()
	const videoClass = useVideoContext()

	const calculateMaxSharesToPurchase = useCallback((videoUUID: string | undefined): number => {
		try {
			if (_.isNull(solanaClass) || _.isNull(solanaClass.walletBalanceSol)) return 0

			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isUndefined(video) || _.isEqual(video.listingSharePriceUsd, 0) || _.isEqual(video.sharesRemainingForSale, 0)) return 0
			const amountOfSharesUserAffords = Math.floor(solanaClass.walletBalanceUSD.get() / video.listingSharePriceUsd)

			return Math.min(amountOfSharesUserAffords, video.sharesRemainingForSale)
		} catch (error) {
			return 0
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, videoClass, solanaClass?.walletBalanceSol])

	return calculateMaxSharesToPurchase
}
