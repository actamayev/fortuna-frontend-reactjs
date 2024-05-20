import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../contexts/exchange-context"

function ChooseBidOrAsk() {
	const exchangeClass = useExchangeContext()

	if (
		_.isNull(exchangeClass) ||
		exchangeClass.bidForSplSharesDetails.purchaseStage === "review" ||
		exchangeClass.askForSplSharesDetails.saleStage === "review"
	) return null

	return (
		<select
			id="transactionType"
			value={exchangeClass.buyOrSellSecondarySplShares}
			onChange={event => exchangeClass.setBuyOrSellSecondaryShares(event.target.value as BuyOrSell)}
			className="border rounded p-1 dark:text-black"
		>
			<option value="Buy">Buy</option>
			<option value="Sell">Sell</option>
		</select>
	)
}

export default observer(ChooseBidOrAsk)
