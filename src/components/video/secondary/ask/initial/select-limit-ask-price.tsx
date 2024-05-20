import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function SelectLimitAskPrice() {
	const exchangeClass = useExchangeContext()

	const updateSplAskDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updateSplAskDetails("askPricePerShareUsd", Number(e.target.value))
	}, [exchangeClass])

	const askPricePerShareUsd = useMemo(() => {
		if (_.isNull(exchangeClass)) return ""
		return exchangeClass.askForSplSharesDetails.askPricePerShareUsd.toString()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, exchangeClass?.askForSplSharesDetails.askPricePerShareUsd])

	return (
		<FormGroup
			label="Limit Price Per Share ($)"
			type="number"
			onChange={updateSplAskDetails}
			required
			value={askPricePerShareUsd}
			minValue={0}
		/>
	)
}

export default observer(SelectLimitAskPrice)
