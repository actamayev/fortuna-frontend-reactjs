import ReviewPurchaseButton from "./review-purchase-button"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"

export default function InitialPurchaseInfo() {
	return (
		<div>
			<div className="text-center font-semibold">Purchase Shares</div>
			<div><SelectNumberSharesToPurchase /></div>

			<ReviewPurchaseButton />
		</div>
	)
}
