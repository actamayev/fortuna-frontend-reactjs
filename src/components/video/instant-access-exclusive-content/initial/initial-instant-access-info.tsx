import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import InstantAccessCost from "./instant-access-cost"
import { useVideoContext } from "../../../../contexts/video-context"
import ReviewInstantAccessButton from "./review-instant-access-button"
import { useMarketContext } from "../../../../contexts/market-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function InitialInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const video = videoClass.findVideoFromUUID(videoUUID)
	const marketClass = useMarketContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (
		_.isUndefined(video) ||
		video.isVideoExclusive === false ||
		_.isNull(positionsAndTransactionsClass) ||
		_.isNull(marketClass) ||
		marketClass.instantAccessToExclusiveContentStage !== "initial"
	) return null

	if (positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(video.uuid) === true) {
		return (
			<div className="w-full">
				<div className="flex items-center w-full">
					<span>You have already purchased access to this exclusive video</span>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Instant Access
			</div>
			<InstantAccessCost video={video}/>
			<div className="mt-3 mb-3 flex justify-center">
				<ReviewInstantAccessButton video={video}/>
			</div>
		</>
	)
}

export default observer(InitialInstantAccessInfo)
