import _ from "lodash"
import { observer } from "mobx-react"
import SingleMyExclusiveContent from "./single-my-exclusive-content"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function MyExclusiveContentOwnershipMap() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	if (_.isNull(positionsAndTransactionClass)) return null

	// FUTURE TODO: Add a button that leads the user to add a new piece of content if there is no content.
	// Should be the same size as a piece of content
	if (positionsAndTransactionClass.isRetrievingOwnership === true || positionsAndTransactionClass.hasOwnershipToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Ownership...</div>
	} else if (_.isEmpty(positionsAndTransactionClass.myExclusiveContent)) {
		return <div className="dark:text-white">No Exclusive Content</div>
	}

	return (
		<>
			<div className="dark:text-white">
				My Exlusive Content
			</div>
			<div className="grid grid-cols-4">
				{positionsAndTransactionClass.myExclusiveContent.map(exclusiveCotent => (
					<SingleMyExclusiveContent key={exclusiveCotent.uuid} myExclusiveContent={exclusiveCotent} />
				))}
			</div>
		</>
	)
}

export default observer(MyExclusiveContentOwnershipMap)
