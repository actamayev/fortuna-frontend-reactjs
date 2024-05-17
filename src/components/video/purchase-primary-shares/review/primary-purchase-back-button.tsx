import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function PrimaryPurchaseBackButton() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<Button
			title="<"
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			onClick={() => exchangeClass.updatePurchasePrimarySplSharesDetails("purchaseStage", "initial")}
			className="font-semibold"
		/>
	)
}

export default observer(PrimaryPurchaseBackButton)
