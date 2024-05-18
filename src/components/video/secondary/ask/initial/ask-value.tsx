import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function AskValue() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			Sale Value:
			${exchangeClass.askForSplSharesDetails.numberofSharesAskingFor * exchangeClass.askForSplSharesDetails.askPricePerShareUsd}
		</>
	)
}

export default observer(AskValue)
