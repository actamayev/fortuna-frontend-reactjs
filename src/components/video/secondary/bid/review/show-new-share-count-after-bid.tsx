import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ShowNewShareCountAfterBid() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return null

	const numberSharesOwned = exchangeClass.getNumberSharesOwnedByUUID(videoUUID)
	const numberSharesBiddingFor = exchangeClass.bidForSplSharesDetails.numberOfSharesBiddingFor
	const newShareCount = numberSharesOwned + numberSharesBiddingFor

	return (
		<div className="flex justify-between">
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

export default observer(ShowNewShareCountAfterBid)
