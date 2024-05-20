import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function BidValue() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			Purchase Value:
			${exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor * exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd}
		</>
	)
}

export default observer(BidValue)
