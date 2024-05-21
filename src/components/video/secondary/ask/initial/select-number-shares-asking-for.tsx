import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
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
		const numberSharesAbleToSell = exchangeClass.getNumberSharesAbleToSell(videoUUID)
		if (value > numberSharesAbleToSell) value = numberSharesAbleToSell
		exchangeClass.updateSplAskDetails("numberofSharesAskingFor", value)
	}, [exchangeClass, formatNumberToWholeNumber, videoUUID])

	const numberofSharesAskingFor = useMemo(() => {
		if (_.isNull(exchangeClass)) return ""
		return exchangeClass.askForSplSharesDetails.numberofSharesAskingFor.toString()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, exchangeClass?.askForSplSharesDetails.numberofSharesAskingFor])

	const numberSharesAbleToSell = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return 0
		return exchangeClass.getNumberSharesAbleToSell(videoUUID)
	}, [exchangeClass, videoUUID])

	return (
		<FormGroup
			label="Number Shares to Sell"
			type="number"
			onChange={handleChangeShareNumber}
			required
			value={numberofSharesAskingFor}
			minValue={0}
			maxValue={numberSharesAbleToSell}
		/>
	)
}

export default observer(SelectNumberSharesAskingFor)
