import _ from "lodash"
import { observer } from "mobx-react"
import ReviewAskInfo from "./review/review-ask-info"
import InitialAskInfo from "./initial/initial-ask-info"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function AskForSecondarySharesOptions() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass) || exchangeClass.buyOrSellSecondarySplShares !== "Sell") return null

	return (
		<>
			{exchangeClass.askForSplSharesDetails.saleStage === "initial" && <InitialAskInfo />}
			{exchangeClass.askForSplSharesDetails.saleStage === "review" && <ReviewAskInfo />}
		</>
	)
}

export default observer(AskForSecondarySharesOptions)
