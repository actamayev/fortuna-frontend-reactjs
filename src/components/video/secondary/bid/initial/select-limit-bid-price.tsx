import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function SelectLimitBidPrice() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<FormGroup
			label="Limit Price Per Share ($)"
			type="number"
			onChange={(e) => exchangeClass.updateSplBidDetails("bidPricePerShareUsd", Number(e.target.value))}
			required
			value={exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd.toString()}
			minValue={0}
		/>
	)
}

export default observer(SelectLimitBidPrice)
