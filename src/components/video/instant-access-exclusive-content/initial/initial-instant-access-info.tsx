import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import InstantAccessCost from "./instant-access-cost"
import { useVideoContext } from "../../../../contexts/video-context"
import ReviewInstantAccessButton from "./review-instant-access-button"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function InitialInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const exchangeClass = useExchangeContext()

	const video = videoClass.findVideoFromUUID(videoUUID)

	if (
		_.isUndefined(video) ||
		video.isSplExclusive === false ||
		_.isNull(exchangeClass) ||
		exchangeClass.instantAccessToExclusiveContentStage !== "initial"
	) return null

	return (
		<>
			<div className="flex items-center w-full">
				<hr className="flex-grow border-t border-gray-300" />
				<span className="px-4 text-gray-500">or</span>
				<hr className="flex-grow border-t border-gray-300" />
			</div>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Instant Access
			</div>
			<InstantAccessCost />
			<ReviewInstantAccessButton />
		</>
	)
}

export default observer(InitialInstantAccessInfo)
