import _ from "lodash"
import { observer } from "mobx-react"
import ShowAskPrice from "./show-ask-price"
import ConfirmAskButton from "./confirm-ask-button"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import ShowNewWalletBalanceAfterAsk from "./show-new-wallet-balance-after-ask"
import ShowRemainingNumberSharesAfterAsk from "./show-remaining-number-shares-after-ask"

function ReviewAskInfo() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			<ShowAskPrice />
			<ShowRemainingNumberSharesAfterAsk />
			<ShowNewWalletBalanceAfterAsk />
			<div className="flex justify-center mt-2">
				<ConfirmAskButton />
			</div>
		</>
	)
}

export default observer(ReviewAskInfo)
