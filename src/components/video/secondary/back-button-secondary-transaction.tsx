import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../button"
import { useExchangeContext } from "../../../contexts/exchange-context"

function BackButtonSecondaryTransaction() {
	const exchangeClass = useExchangeContext()

	const resetBidAndAskDetails = useCallback(() => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updateSplBidDetails("purchaseStage", "initial")
		exchangeClass.updateSplAskDetails("saleStage", "initial")
	}, [exchangeClass])

	if (
		_.isNull(exchangeClass) ||
		(exchangeClass.askForSplSharesDetails.saleStage === "initial" && exchangeClass.bidForSplSharesDetails.purchaseStage === "initial")
	) return null

	return (
		<Button
			title="<"
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			onClick={resetBidAndAskDetails}
			className="font-semibold"
		/>
	)
}

export default observer(BackButtonSecondaryTransaction)
