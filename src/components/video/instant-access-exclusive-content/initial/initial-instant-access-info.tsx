import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import OneTierInfo from "./one-tier-info"
import TwoTiersInfo from "./two-tiers-info"
import Button from "../../../buttons/button"
import ThreeTiersInfo from "./three-tiers-info"
import { useVideoContext } from "../../../../contexts/video-context"
import { useMarketContext } from "../../../../contexts/market-context"
import useClickTiersButton from "../../../../hooks/market/click-tiers-button"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"

function InitialInstantAccessInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const video = videoClass.findVideoFromUUID(videoUUID)
	const marketClass = useMarketContext()
	const clickTiersButton = useClickTiersButton(video)
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video?.uuid)

	if (
		_.isUndefined(video) ||
		marketClass?.instantAccessToExclusiveContentStage !== "initial"
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

			{doesUserHaveAccessToExclusiveContent === true ? (
				<div className="flex items-center w-full">
					<span>You already purchased access to this exclusive video</span>
				</div>
			) : (
				<div className="text-center font-semibold flex justify-center items-center">
					<Button
						title={`Unlock Instant Access for $${getTieredAccessPriceUsd(video)}`}
						colorClass="bg-blue-300 dark:bg-blue-400"
						hoverClass="hover:bg-blue-400 dark:hover:bg-blue-500"
						className="font-semibold text-zinc-950"
						onClick={clickTiersButton}
					/>
				</div>
			)}
		</div>
	)
}

export default observer(InitialInstantAccessInfo)
