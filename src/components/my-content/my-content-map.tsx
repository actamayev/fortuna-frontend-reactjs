import _ from "lodash"
import { observer } from "mobx-react"
import SingleContent from "./single-content"
import { useSolanaContext } from "../../contexts/solana-context"

function MyContentMap() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	if (solanaClass.isRetrievingContent === true || solanaClass.hasContentToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Content...</div>
	} else if (_.isEmpty(solanaClass.myContentMap)) {
		return <div className="dark:text-white">No content</div>
	}

	const contentKeys = Array.from(solanaClass.myContentMap.keys())

	return (
		<div className="grid grid-cols-4 gap-4 p-4">
			{contentKeys.map((item) => {
				return <SingleContent key={item} mintAddress={item} />
			})}
		</div>
	)
}

export default observer(MyContentMap)
