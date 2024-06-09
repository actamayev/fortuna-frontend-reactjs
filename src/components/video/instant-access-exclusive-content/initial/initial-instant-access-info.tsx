import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import OneTierInfo from "./one-tier-info"
import TwoTiersInfo from "./two-tiers-info"
import ThreeTiersInfo from "./three-tiers-info"
import { useVideoContext } from "../../../../contexts/video-context"
import { useMarketContext } from "../../../../contexts/market-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

// eslint-disable-next-line complexity
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

	if (_.isNull(video.numberOfExclusivePurchasesSoFar)) {
		return (
			<>Not exclusive</>
		)
	}

	return (
		<>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Instant Access
			</div>
			{video.tierData.length === 1 && (
				<OneTierInfo
					tier={video.tierData[0]}
					numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
				/>
			)}
			{video.tierData.length === 2 && (
				<TwoTiersInfo
					tiers={video.tierData}
					numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
				/>
			)}
			{video.tierData.length === 3 && (
				<ThreeTiersInfo
					tiers={video.tierData}
					numberOfExclusivePurchasesSoFar={video.numberOfExclusivePurchasesSoFar}
				/>
			)}
		</>
	)
}

export default observer(InitialInstantAccessInfo)
