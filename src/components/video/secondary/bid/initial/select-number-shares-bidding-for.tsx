import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../../../../form-group"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import useFormatNumberToWholeNumber from "../../../../../hooks/format-number-to-whole-number"

function SelectNumberSharesBiddingFor() {
	const exchangeClass = useExchangeContext()
	const formatNumberToWholeNumber = useFormatNumberToWholeNumber()

	const updateSplBidDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(exchangeClass)) return
		exchangeClass.updateSplBidDetails("numberOfSharesBiddingFor", formatNumberToWholeNumber(e.target.value))
	}, [exchangeClass, formatNumberToWholeNumber])

	const numberOfSharesBiddingFor = useMemo(() => {
		if (_.isNull(exchangeClass)) return ""
		return exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor.toString()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, exchangeClass?.bidForSplSharesDetails.numberOfSharesBiddingFor])

	return (
		<FormGroup
			label="Number Shares to buy"
			type="number"
			onChange={updateSplBidDetails}
			required
			value={numberOfSharesBiddingFor}
			minValue={0}
		/>
	)
}

export default observer(SelectNumberSharesBiddingFor)
