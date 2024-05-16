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
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const videoClass = useVideoContext()

	const isAbleToPurchaseShares = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isNull(solanaClass)) return false
		if (exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd === 0) return false
		// eslint-disable-next-line max-len
		const sharePurchaseValueUsd = exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor * exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd
		return sharePurchaseValueUsd < solanaClass.walletBalanceUSD.get()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		exchangeClass?.bidForSplSharesDetails.numberOfSharesBiddingFor,
		exchangeClass?.bidForSplSharesDetails.bidPricePerShareUsd,
		solanaClass
	])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return
		const video = videoClass.findVideoFromUUID(videoUUID)
		if (_.isUndefined(video)) return
		exchangeClass.updateSplBidDetails("purchaseStage", "review")
		exchangeClass.updateSplBidDetails("splPublicKey", video.splPublicKey)
	}, [exchangeClass, videoClass, videoUUID])

	const createTitleForButton = useMemo(() => {
		if (isAbleToPurchaseShares === false) return "Unable to bid for shares"
		return "Review Bid"
	}, [isAbleToPurchaseShares])

	if (_.isNull(exchangeClass)) return null

	return (
		<div className="flex justify-center">
			<Button
				onClick={onClickButton}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title={createTitleForButton}
				disabled={!isAbleToPurchaseShares || _.isEqual(exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor, 0)}
				className="font-semibold"
			/>
		</div>
	)
}

export default observer(ReviewBidButton)
