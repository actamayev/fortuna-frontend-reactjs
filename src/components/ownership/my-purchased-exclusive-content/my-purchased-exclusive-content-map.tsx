import _ from "lodash"
import { observer } from "mobx-react"
import SingleMyPurchasedExclusiveContent from "./single-my-purchased-exclusive-content"
import useMyOwnershipToShow from "../../../hooks/positions-and-transactions/my-ownership-to-show"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function MyPurchasedExclusiveContentMap() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()
	const myOwnershipToShow = useMyOwnershipToShow()

	if (_.isNull(positionsAndTransactionClass)) return null

	if (
		positionsAndTransactionClass.isRetrievingPurchasedExclusiveContent === true ||
		positionsAndTransactionClass.hasPurchasedExclusiveContentToRetrieve === true
	) {
		return <div className="dark:text-zinc-200 ml-2.5">Retrieving Ownership...</div>
	} else if (_.isEmpty(myOwnershipToShow)) {
		return <div className="dark:text-zinc-200 ml-2.5">No Exclusive Content</div>
	}

	return (
		<div className="grid grid-cols-6">
			{myOwnershipToShow.map(exclusiveContent => (
				<SingleMyPurchasedExclusiveContent
					key={exclusiveContent.uuid}
					myPurchasedExclusiveContent={exclusiveContent}
				/>
			))}
		</div>
	)
}

export default observer(MyPurchasedExclusiveContentMap)
