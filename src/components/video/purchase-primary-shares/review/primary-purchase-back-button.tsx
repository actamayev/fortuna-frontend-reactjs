import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../../button"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function PrimaryPurchaseBackButton() {
	const exchangeClass = useExchangeContext()

	const updatePurchasePrimarySplSharesDetails = useCallback(() => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updatePurchasePrimarySplSharesDetails("purchaseStage", "initial")
	} ,[exchangeClass])

	return (
		<Button
			title="<"
			colorClass="bg-blue-200 dark:bg-blue-600"
			hoverClass="hover:bg-blue-300 dark:hover:bg-blue-700"
			onClick={updatePurchasePrimarySplSharesDetails}
			className="font-semibold"
		/>
	)
}

export default observer(PrimaryPurchaseBackButton)
