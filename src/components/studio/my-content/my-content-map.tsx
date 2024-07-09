import _ from "lodash"
import { observer } from "mobx-react"
import SingleMyContent from "./single-my-content"
import { useCreatorContext } from "../../../contexts/creator-context"

function MyContentMap() {
	const creatorClass = useCreatorContext()

	if (_.isNull(creatorClass)) return null

	if (creatorClass.isRetrievingContent === true || creatorClass.hasContentToRetrieve === true) {
		return <div className="dark:text-zinc-200">Retrieving Content...</div>
	}

	return (
		<div className="flex flex-col space-y-4">
			{creatorClass.myContent.map(singleMyContent => (
				<SingleMyContent key={singleMyContent.uuid} content={singleMyContent} />
			))}
		</div>
	)
}

export default observer(MyContentMap)
