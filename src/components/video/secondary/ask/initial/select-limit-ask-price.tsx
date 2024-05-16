import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function SelectLimitAskPrice() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	// TODO: Add Sol price as well
	return (
		<div>
			<FormGroup
				label="Limit Price ($)"
				type="number"
				onChange={(e) => exchangeClass.updateSplAskDetails("askPricePerShareUsd", Number(e.target.value))}
				required
				value={exchangeClass.askForSplSharesDetails.askPricePerShareUsd.toString()}
				minValue={0}
			/>
		</div>
	)
}

export default observer(SelectLimitAskPrice)
