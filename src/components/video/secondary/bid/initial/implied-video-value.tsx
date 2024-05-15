import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../../contexts/video-context"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ImpliedVideoValue() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const videoClass = useVideoContext()

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	return (
		<>
			Implied Video Value: ${video.totalNumberShares * exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd}
		</>
	)
}

export default observer(ImpliedVideoValue)
