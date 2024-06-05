import _ from "lodash"
import { observer } from "mobx-react"
import SingleMyPurchasedExclusiveContent from "./single-my-purchased-exclusive-content"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

function MyPurchasedExclusiveContentMap() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	if (_.isNull(positionsAndTransactionClass)) return null

	// FUTURE TODO: Add a button that leads the user to add a new piece of content if there is no content.
	// Should be the same size as a piece of content
	if (
		positionsAndTransactionClass.isRetrievingPurchasedExclusiveContent === true ||
		positionsAndTransactionClass.hasPurchasedExclusiveContentToRetrieve === true
	) {
		return <div className="dark:text-zinc-200">Retrieving Ownership...</div>
	} else if (_.isEmpty(positionsAndTransactionClass.myPurchasedExclusiveContent)) {
		return <div className="dark:text-zinc-200">No Exclusive Content</div>
	}

	return (
		<>
			<div className="dark:text-zinc-200">
				My Purchased Exlusive Content
			</div>
			<div className="grid grid-cols-4">
				{positionsAndTransactionClass.myPurchasedExclusiveContent.map(exclusiveCotent => (
					<SingleMyPurchasedExclusiveContent key={exclusiveCotent.uuid} myPurchasedExclusiveContent={exclusiveCotent} />
				))}
			</div>
		</>
	)
}

export default observer(MyPurchasedExclusiveContentMap)
