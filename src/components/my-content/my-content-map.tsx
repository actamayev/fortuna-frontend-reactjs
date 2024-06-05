import _ from "lodash"
import { observer } from "mobx-react"
import SingleMyContent from "./single-my-content"
import { useCreatorContext } from "../../contexts/creator-context"

function MyContentMap() {
	const creatorClass = useCreatorContext()

	if (_.isNull(creatorClass)) return null

	// FUTURE TODO: Add a button that leads the user to add a new piece of content if there is no content.
	// Should be the same size as a piece of content
	if (creatorClass.isRetrievingContent === true || creatorClass.hasContentToRetrieve === true) {
		return <div className="dark:text-zinc-200">Retrieving Content...</div>
	} else if (_.isEmpty(creatorClass.myContent)) {
		return <div className="dark:text-zinc-200">No content</div>
	}

	return (
		<div className="grid grid-cols-4">
			{creatorClass.myContent.map(singleMyContent => (
				<SingleMyContent key={singleMyContent.uuid} content={singleMyContent} />
			))}
		</div>
	)
}

export default observer(MyContentMap)
