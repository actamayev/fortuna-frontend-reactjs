import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import Button from "../../../../button"
import { useVideoContext } from "../../../../../contexts/video-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ReviewAskButton() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const exchangeClass = useExchangeContext()

	const isAbleToAskForShares = useMemo(() => {
		if (_.isNull(exchangeClass)) return false
		if (_.isEqual(exchangeClass.askForSplSharesDetails.askPricePerShareUsd, 0)) return false
		if (_.isEqual(exchangeClass.askForSplSharesDetails.numberofSharesAskingFor, 0)) return false
		if (_.isUndefined(videoUUID)) return false
		const numberSharesHeld = exchangeClass.getNumberSharesOwnedByUUID(videoUUID)
		if (numberSharesHeld < exchangeClass.askForSplSharesDetails.numberofSharesAskingFor) return false
		return true
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, videoUUID,
		exchangeClass?.askForSplSharesDetails.askPricePerShareUsd, exchangeClass?.askForSplSharesDetails.numberofSharesAskingFor])

	const onClickButton = useCallback(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return
		const video = videoClass.findVideoFromUUID(videoUUID)
		if (_.isUndefined(video)) return
		exchangeClass.updateSplAskDetails("saleStage", "review")
		exchangeClass.updateSplAskDetails("splPublicKey", video.splPublicKey)
	}, [exchangeClass, videoClass, videoUUID])

	if (_.isNull(exchangeClass)) return null

	return (
		<Button
			onClick={onClickButton}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Review Ask"
			disabled={!isAbleToAskForShares}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewAskButton)
