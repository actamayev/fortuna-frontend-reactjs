import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function ShowNewShareCountAfterPurchase() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (_.isNull(exchangeClass) || _.isNull(positionsAndTransactionsClass) || _.isUndefined(videoUUID)) return null

	const numberSharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(videoUUID)
	const numberSharesBiddingFor = exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing
	const newShareCount = numberSharesOwned + numberSharesBiddingFor

	return (
		<div className="flex justify-between mb-2">
			<div>New Share Count: {" "}</div>
			<div>
				{newShareCount} {" "}
				<span className="text-green-600">
					(+{numberSharesBiddingFor})
				</span>
			</div>
		</div>
	)
}

export default observer(ShowNewShareCountAfterPurchase)
