import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ReviewAskInfo() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			Review Ask info
		</>
	)
}

export default observer(ReviewAskInfo)
