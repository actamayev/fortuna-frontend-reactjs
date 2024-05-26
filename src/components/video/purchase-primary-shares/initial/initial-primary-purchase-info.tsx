import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Tooltip from "../../../tooltip"
import CostPerShareArea from "./cost-per-share-area"
import ShowTradingBalance from "../../show-trading-balance"
import ReviewPurchaseButton from "./review-purchase-button"
import { useVideoContext } from "../../../../contexts/video-context"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"
import InitialInstantAccessInfo from "../../instant-access-exclusive-content/initial/initial-instant-access-info"

function InitialPrimaryPurchaseInfo() {
	const { videoUUID } = useParams<{ videoUUID: string}>()
	const videoClass = useVideoContext()
	const video = videoClass.findVideoFromUUID(videoUUID)

	if (_.isUndefined(video)) return null

	return (
		<div>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Purchase Primary Shares
				<Tooltip message="All proceeds go to the creator" />
			</div>
			<div className="mt-3">
				<ShowTradingBalance />
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
			<InitialInstantAccessInfo video={video}/>
		</div>
	)
}

export default observer(InitialPrimaryPurchaseInfo)
