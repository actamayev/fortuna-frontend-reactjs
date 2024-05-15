import Tooltip from "../../../tooltip"
import CostPerShareArea from "./cost-per-share-area"
import ReviewPurchaseButton from "./review-purchase-button"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"
import ShowAvailableTradingBalance from "../../show-available-trading-balance"

export default function InitialPrimaryPurchaseInfo() {
	return (
		<div>
			<div className="text-center font-semibold flex justify-center items-center">
				Purchase Primary Shares
				<Tooltip
					message="All proceeds go to the creator"
				/>
			</div>
			<div className="mt-3">
				<ShowAvailableTradingBalance />
			</div>
			<div className="mt-3">
				<SelectNumberSharesToPurchase />
			</div>
			<div className="mt-3">
				<CostPerShareArea />
			</div>
			<div className="mt-3">
				<ReviewPurchaseButton />
			</div>
		</div>
	)
}
