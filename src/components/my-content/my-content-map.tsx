import _ from "lodash"
import { observer } from "mobx-react"
import SingleMyContent from "./single-my-content"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

function MyContentMap() {
	const positionsAndTransactionClass = usePositionsAndTransactionsContext()

	if (_.isNull(positionsAndTransactionClass)) return null

	// FUTURE TODO: Add a button that leads the user to add a new piece of content if there is no content.
	// Should be the same size as a piece of content
	if (positionsAndTransactionClass.isRetrievingContent === true || positionsAndTransactionClass.hasContentToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Content...</div>
	} else if (_.isEmpty(positionsAndTransactionClass.myContent)) {
		return <div className="dark:text-white">No content</div>
	}

	return (
		<div className="grid grid-cols-4">
			{positionsAndTransactionClass.myContent.map(singleMyContent => (
				<SingleMyContent key={singleMyContent.mintAddress} content={singleMyContent} />
			))}
		</div>
	)
}

export default observer(MyContentMap)
