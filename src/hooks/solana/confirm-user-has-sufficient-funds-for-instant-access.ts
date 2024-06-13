import _ from "lodash"
import { useCallback } from "react"
import { useVideoContext } from "../../contexts/video-context"
import { useSolanaContext } from "../../contexts/solana-context"
import getTieredAccessPriceUsd from "../../utils/video-access-tiers/get-tiered-access-price-usd"

export default function useConfirmUserHasSufficientFundsForInstantAccess(): (
	videoUUID: string | undefined
) => boolean {
	const solanaClass = useSolanaContext()
	const videoClass = useVideoContext()

	const confirmUserHasSufficientFundsForInstantAccess = useCallback((
		videoUUID: string | undefined
	): boolean => {
		try {
			const video = videoClass.findVideoFromUUID(videoUUID)
			if (_.isNull(solanaClass) || _.isUndefined(video)) return false

			const videoAccessPriceUsd = getTieredAccessPriceUsd(video)
			if (_.isNull(videoAccessPriceUsd)) return false
			const myWalletBalanceUsd = solanaClass.walletBalanceUSD.get()

			return myWalletBalanceUsd >= videoAccessPriceUsd
		} catch (error) {
			console.error(error)
			return false
		}
	}, [solanaClass, videoClass])

	return confirmUserHasSufficientFundsForInstantAccess
}
