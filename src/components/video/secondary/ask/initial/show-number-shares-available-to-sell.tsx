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

	const numberSharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(videoUUID)
	const numberSharesAskingFor = exchangeClass.getRemainingSharesForSale(videoUUID)
	const numberSharesAbleToAskFor = numberSharesOwned - numberSharesAskingFor

	return (
		<>
			Shares available to sell: {numberSharesAbleToAskFor}
		</>
	)
}

export default observer(ShowNumberSharesUserHolds)
