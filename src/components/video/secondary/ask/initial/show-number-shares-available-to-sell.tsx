import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useExchangeContext } from "../../../../../contexts/exchange-context"

function ShowNumberSharesUserHolds() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass) || _.isUndefined(videoUUID)) return null

	const numberSharesAbleToSell = exchangeClass.getNumberSharesAbleToSell(videoUUID)

	return (
		<>
			Shares available to sell: {numberSharesAbleToSell}
		</>
	)
}

export default observer(ShowNumberSharesUserHolds)
