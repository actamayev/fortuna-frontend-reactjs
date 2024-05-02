import _ from "lodash"
import { observer } from "mobx-react"
import SingleContent from "./single-content"
import { useSolanaContext } from "../../contexts/solana-context"

function MyContentMap() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	// FUTURE TODO: Add a button that leads the user to add a new piece of content if there is no content.
	// Should be the same size as a piece of content
	if (solanaClass.isRetrievingContent === true || solanaClass.hasContentToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Content...</div>
	} else if (_.isEmpty(solanaClass.myContent)) {
		return <div className="dark:text-white">No content</div>
	}

	return (
		<div className="grid grid-cols-4">
			{solanaClass.myContent.map((item) => {
				return <SingleContent key={item.mintAddress} content={item} />
			})}
		</div>
	)
}

export default observer(MyContentMap)
