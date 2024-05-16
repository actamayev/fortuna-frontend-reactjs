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
	return <>{remainingShares}</>
}

export default observer(ShowRemainingNumberSharesAfterAsk)
