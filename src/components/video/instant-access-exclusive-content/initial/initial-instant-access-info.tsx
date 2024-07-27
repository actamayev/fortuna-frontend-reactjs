import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import OneTierInfo from "./one-tier-info"
import TwoTiersInfo from "./two-tiers-info"
import ThreeTiersInfo from "./three-tiers-info"
import { useVideoContext } from "../../../../contexts/video-context"
import { useMarketContext } from "../../../../contexts/market-context"
import ReviewInstantAccessButton from "./review-instant-access-button"

function InitialInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const video = videoClass.findVideoFromUUID(videoUUID)
	const marketClass = useMarketContext()

	if (
		_.isUndefined(video) ||
		marketClass.instantAccessToExclusiveContentStage !== "initial"
	) return null

	if (
		video.isVideoExclusive === false ||
		_.isNull(video.numberOfExclusivePurchasesSoFar)
	) {
		return <>Not exclusive</>
	}

	return (
		<div>
			<div className="text-center font-semibold flex justify-center items-center text-xl mb-2">
				Instant Access
			</div>
			{video.tierData.length === 1 && (
				<OneTierInfo video={video} />
			)}
			{video.tierData.length === 2 && (
				<TwoTiersInfo video={video} />
			)}
			{video.tierData.length === 3 && (
				<ThreeTiersInfo video={video} />
			)}

			<ReviewInstantAccessButton video={video} />
		</div>
	)
}

export default observer(InitialInstantAccessInfo)
