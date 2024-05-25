import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import Button from "../../../button"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function ReviewInstantAccessButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isUndefined(videoUUID) || _.isNull(solanaClass)) return false
		const video  = videoClass.findVideoFromUUID(videoUUID)
		if (_.isUndefined(video) || _.isNull(video.listingPriceToAccessContentUsd)) return false
		return solanaClass.walletBalanceUSD.get() >= video.listingPriceToAccessContentUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, videoClass, solanaClass?.walletBalanceUSD.get(), videoUUID])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.setInstantAccessToExclusiveContentStage("review")
	}, [exchangeClass])

	if (_.isUndefined(videoUUID)) return null
	const video  = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video) || _.isNull(video.listingPriceToAccessContentUsd)) return null

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Review Instant Access Purchase"
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewInstantAccessButton)
