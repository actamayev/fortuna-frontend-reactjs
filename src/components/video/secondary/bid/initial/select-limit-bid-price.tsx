import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function SelectLimitBidPrice() {
	const exchangeClass = useExchangeContext()

	const updateSplBidDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updateSplBidDetails("bidPricePerShareUsd", Number(e.target.value))
	}, [exchangeClass])

	const bidPricePerShareUsd = useMemo(() => {
		if (_.isNull(exchangeClass)) return ""
		return exchangeClass.bidForSplSharesDetails.bidPricePerShareUsd.toString()
	}, [exchangeClass])

	return (
		<FormGroup
			label="Limit Price Per Share ($)"
			type="number"
			onChange={updateSplBidDetails}
			required
			value={bidPricePerShareUsd}
			minValue={0}
		/>
	)
}

export default observer(SelectLimitBidPrice)
