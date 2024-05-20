import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ShowRemainingNumberSharesAfterAsk() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return null

	const numberSharesOwned = exchangeClass.getNumberSharesOwnedByUUID(videoUUID)
	const numberSharesAskingFor = exchangeClass.askForSplSharesDetails.numberofSharesAskingFor
	const remainingShares = numberSharesOwned - numberSharesAskingFor

	return (
		<div className="flex justify-between">
			<div>New Share Count: {" "}</div>
			<div>
				{remainingShares} {" "}
				<span className="text-red-600">
					(-{numberSharesAskingFor})
				</span>
			</div>
		</div>
	)
}

export default observer(ShowRemainingNumberSharesAfterAsk)
