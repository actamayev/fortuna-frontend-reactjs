import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../contexts/exchange-context"

function TradeSecondarySharesTitle() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null
	let title = "Trade Secondary Shares"

	if (exchangeClass.bidForSplSharesDetails.purchaseStage !== "initial") {
		title = "Place Bid on Secondary Shares"
	} else if (exchangeClass.asForSplSharesDetails.saleStage !== "initial") {
		title = "Place Ask on Secondary Shares"
	}
	return <>{title}</>
}

export default observer(TradeSecondarySharesTitle)
