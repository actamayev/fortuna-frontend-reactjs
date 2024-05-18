import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import Button from "../../../../button"
import { useVideoContext } from "../../../../../contexts/video-context"
import { useSolanaContext } from "../../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ReviewBidButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isNull(solanaClass)) return false
		if (_.isEqual(exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd, 0)) return false
		if (_.isEqual(exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor, 0)) return false
		// eslint-disable-next-line max-len
		const sharePurchaseValueUsd = exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor * exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd
		return sharePurchaseValueUsd < solanaClass.walletBalanceUSD.get()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		solanaClass,
		exchangeClass?.bidForSplSharesDetails.numberOfSharesBiddingFor,
		exchangeClass?.bidForSplSharesDetails.bidPricePerShareUsd
	])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return
		const video = videoClass.findVideoFromUUID(videoUUID)
		if (_.isUndefined(video)) return
		exchangeClass.updateSplBidDetails("purchaseStage", "review")
		exchangeClass.updateSplBidDetails("splPublicKey", video.splPublicKey)
	}, [exchangeClass, videoClass, videoUUID])

	if (_.isNull(exchangeClass)) return null

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Review Bid"
			disabled={!isAbleToPurchaseShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewBidButton)
