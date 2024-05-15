import _ from "lodash"
import { observer } from "mobx-react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import useFormatNumberToWholeNumber from "../../../../../hooks/format-number-to-whole-number"

function SelectNumberSharesBiddingFor() {
	const exchangeClass = useExchangeContext()
	const formatNumberToWholeNumber = useFormatNumberToWholeNumber()

	if (_.isNull(exchangeClass)) return null

	return (
		<div>
			<FormGroup
				label="Number Shares to buy"
				type="number"
				onChange={(e) => {
					exchangeClass.updatePurchaseSecondarySplSharesDetails(
						"numberOfSharesBiddingFor",
						formatNumberToWholeNumber(e.target.value)
					)
				}}
				required
				value={exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor.toString()}
				minValue={0}
			/>
		</div>
	)
}

export default observer(SelectNumberSharesBiddingFor)
