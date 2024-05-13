import _ from "lodash"
import { observer } from "mobx-react"
import SingleOwnership from "./single-ownership"
import { useExchangeContext } from "../../contexts/exchange-context"

function MyOwnershipMap() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	if (exchangeClass.isRetrievingOwnership === true || exchangeClass.hasOwnershipToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Ownership...</div>
	} else if (_.isEmpty(exchangeClass.myOwnership)) {
		return <div className="dark:text-white">No ownership</div>
	}

	return (
		<div className="grid grid-cols-4">
			{exchangeClass.myOwnership.map((item) => {
				return <SingleOwnership key={item.splPublicKey} ownership={item} />
			})}
		</div>
	)
}

export default observer(MyOwnershipMap)
