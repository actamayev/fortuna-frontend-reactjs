import CostPerShareArea from "./cost-per-share-area"
import ReviewPurchaseButton from "./review-purchase-button"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"
import ShowAvailableTradingBalance from "../../show-available-trading-balance"

export default function InitialPurchaseInfo() {
	return (
		<div>
			<div className="text-center font-semibold">Purchase Shares</div>
			<ShowAvailableTradingBalance />
			<SelectNumberSharesToPurchase />
			<CostPerShareArea />

			<ReviewPurchaseButton />
		</div>
	)
}
