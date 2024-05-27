import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Tooltip from "../../../tooltip"
import CostPerShareArea from "./cost-per-share-area"
import ShowTradingBalance from "../../show-trading-balance"
import ReviewPurchaseButton from "./review-purchase-button"
import ShowNumberSharesOwned from "./show-number-shares-owned"
import { useVideoContext } from "../../../../contexts/video-context"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"
import InitialInstantAccessInfo from "../../instant-access-exclusive-content/initial/initial-instant-access-info"

function InitialPrimaryPurchaseInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const video = videoClass.findVideoFromUUID(videoUUID)

	if (_.isUndefined(video)) return null

	if (video.splListingStatus === "SOLDOUT") {
		return (
			<div>
				<InitialInstantAccessInfo video={video} orNeeded={false}/>
			</div>
		)
	}
	return (
		<div>
			<div className="text-center flex justify-center items-center">
				<span className="font-semibold text-xl">
					Purchase Primary Shares
				</span>
				<Tooltip
					message="All proceeds go to the creator"
					width="225px"
				>
					ℹ️
				</Tooltip>
			</div>
			<div className="mt-3">
				<ShowTradingBalance />
			</div>
			<div className="mt-3">
				<ShowNumberSharesOwned video={video}/>
			</div>
			<div className="mt-3">
				<SelectNumberSharesToPurchase />
			</div>
			<div className="mt-3">
				<CostPerShareArea video={video}/>
			</div>
			<div className="mt-3 mb-3 flex justify-center">
				<ReviewPurchaseButton video={video}/>
			</div>
			<InitialInstantAccessInfo video={video} orNeeded={true}/>
		</div>
	)
}

export default observer(InitialPrimaryPurchaseInfo)
