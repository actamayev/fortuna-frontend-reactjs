import _ from "lodash"
import { observer } from "mobx-react"
import SingleContent from "./single-content"
import { useSolanaContext } from "../../contexts/solana-context"

function MyContentMap() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	if (solanaClass.isRetrievingContent === true || solanaClass.hasContentToRetrieve === true) {
		return <>Retrieving Content...</>
	} else if (_.isEmpty(solanaClass.myContentMap)) {
		return <>No content</>
	}

	const contentKeys = Array.from(solanaClass.myContentMap.keys())

	return (
		<div
			className = "card-container"
			style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}
		>
			{contentKeys.map((item) => {
				return <SingleContent key={item} mintAddress={item} />
			})}
		</div>
	)
}

export default observer(MyContentMap)
