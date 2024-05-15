import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function ShowNumberSharesPurchasing() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			Purchasing {exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing} {" "}
			share{exchangeClass.purchaseSplSharesDetails.numberOfTokensPurchasing === 1 ? (<></>) : (<>s</>)} for {" "}
		</>
	)
}

export default observer(ShowNumberSharesPurchasing)
