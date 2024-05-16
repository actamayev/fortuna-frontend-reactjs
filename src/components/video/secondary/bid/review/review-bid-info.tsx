import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ReviewBidInfo() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<div className="text-center flex-1">
					Review Bid Placeholder
				</div>
			</div>
		</>
	)
}

export default observer(ReviewBidInfo)
