import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useCalculateMaxSharesToPurchase(): (
	videoUUID: string
) => number {
	const solanaClass = useSolanaContext()
	const videoClass = useVideoContext()

	const calculateMaxSharesToPurchase = useCallback((videoUUID: string): number => {
		try {
			if (_.isNull(solanaClass) || _.isNull(solanaClass.walletBalanceSol)) return 0

			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isUndefined(video) || _.isEqual(video.listingSharePrice, 0)) return 0

			if (video.listingDefaultCurrency === "sol") {
				return Math.floor(solanaClass.walletBalanceSol / video.listingSharePrice)
			} else {
				return Math.floor(solanaClass.walletBalanceUSD.get() / video.listingSharePrice)
			}
		} catch (error) {
			return 0
		}
	}, [solanaClass, videoClass])

	return calculateMaxSharesToPurchase
}
