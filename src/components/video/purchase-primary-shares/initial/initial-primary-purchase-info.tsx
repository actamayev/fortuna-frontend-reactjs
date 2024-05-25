import Tooltip from "../../../tooltip"
import CostPerShareArea from "./cost-per-share-area"
import ShowTradingBalance from "../../show-trading-balance"
import ReviewPurchaseButton from "./review-purchase-button"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"
import InitialInstantAccessInfo from "../../instant-access-exclusive-content/initial/initial-instant-access-info"

export default function InitialPrimaryPurchaseInfo() {
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
				<CostPerShareArea />
			</div>
			<div className="mt-3 mb-3 flex justify-center">
				<ReviewPurchaseButton />
			</div>
			<InitialInstantAccessInfo />
		</div>
	)
}
