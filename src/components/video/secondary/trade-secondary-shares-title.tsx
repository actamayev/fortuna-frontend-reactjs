import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../contexts/exchange-context"

function TradeSecondarySharesTitle() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null
	let title = "Trade Secondary Shares"

	if (exchangeClass.bidForSplSharesDetails.purchaseStage !== "initial") {
		title = "Review Bid"
	} else if (exchangeClass.askForSplSharesDetails.saleStage !== "initial") {
		title = "Review Ask"
	}
	return <>{title}</>
}

export default observer(TradeSecondarySharesTitle)
