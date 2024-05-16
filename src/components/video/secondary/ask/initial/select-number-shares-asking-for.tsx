import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import useFormatNumberToWholeNumber from "../../../../../hooks/format-number-to-whole-number"

function SelectNumberSharesAskingFor() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const formatNumberToWholeNumber = useFormatNumberToWholeNumber()

	const handleChangeShareNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return
		let value = formatNumberToWholeNumber(e.target.value)
		if (isNaN(value)) value = 0
		const numberSharesOwned = exchangeClass.getNumberSharesOwnedByUUID(videoUUID)
		// TODO: Here, subtract the number of shares the user was already asking for
		if (value > numberSharesOwned) value = numberSharesOwned
		exchangeClass.updateSplAskDetails("numberofSharesAskingFor", value)
	}, [exchangeClass, formatNumberToWholeNumber, videoUUID])

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return null

	return (
		<div>
			<FormGroup
				label="Number Shares to Sell"
				type="number"
				onChange={handleChangeShareNumber}
				required
				value={exchangeClass.askForSplSharesDetails.numberofSharesAskingFor.toString()}
				minValue={0}
			/>
		</div>
	)
}

export default observer(SelectNumberSharesAskingFor)
