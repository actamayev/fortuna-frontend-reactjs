import _ from "lodash"
import { observer } from "mobx-react"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useSolanaContext } from "../../contexts/solana-context"
import InitialPurchaseInfo from "./initial/initial-purchase-info"

function PurchaseSharesCard() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 w-5/12">
			{solanaClass.purchaseSplSharesDetails.purchaseStage === "initial" && <InitialPurchaseInfo />}
			{solanaClass.purchaseSplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</div>
	)
}

export default observer(PurchaseSharesCard)
