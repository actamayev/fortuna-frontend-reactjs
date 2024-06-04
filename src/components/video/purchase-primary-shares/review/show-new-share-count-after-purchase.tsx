import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useMarketContext } from "../../../../contexts/market-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

function ShowNewShareCountAfterPurchase() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const marketClass = useMarketContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (_.isNull(marketClass) || _.isNull(positionsAndTransactionsClass) || _.isUndefined(videoUUID)) return null

	const numberSharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(videoUUID)
	const { numberOfTokensPurchasing } = marketClass.purchasePrimarySplSharesDetails
	const newShareCount = numberSharesOwned + numberOfTokensPurchasing

	return (
		<div className="flex justify-between mb-1">
			<div>New Share Count: {" "}</div>
			<div>
				{newShareCount} {" "}
				<span className="text-green-600">
					(+{numberOfTokensPurchasing})
				</span>
			</div>
		</div>
	)
}

export default observer(ShowNewShareCountAfterPurchase)
