import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import { usePositionsAndTransactionsContext } from "../../../../../contexts/positions-and-transactions-context"

function ShowNumberSharesUserHolds() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (_.isNull(exchangeClass) || _.isNull(positionsAndTransactionsClass) || _.isUndefined(videoUUID)) return null

	const remainingSharesForSale = exchangeClass.getRemainingSharesForSale(videoUUID)
	const numberSharesAbleToSell = positionsAndTransactionsClass.getNumberSharesAbleToSell(videoUUID, remainingSharesForSale)

	return (
		<>
			Shares available to sell: {numberSharesAbleToSell}
		</>
	)
}

export default observer(ShowNumberSharesUserHolds)
