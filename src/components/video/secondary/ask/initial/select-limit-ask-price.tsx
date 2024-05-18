import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function SelectLimitAskPrice() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<div>
			<FormGroup
				label="Limit Price Per Share ($)"
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
