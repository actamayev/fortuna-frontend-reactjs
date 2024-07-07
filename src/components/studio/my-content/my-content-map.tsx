import _ from "lodash"
import { observer } from "mobx-react"
import AddNewContent from "./add-new-content"
import SingleMyContent from "./single-my-content"
import { useCreatorContext } from "../../../contexts/creator-context"

function MyContentMap() {
	const creatorClass = useCreatorContext()

	if (_.isNull(creatorClass)) return null

	if (creatorClass.isRetrievingContent === true || creatorClass.hasContentToRetrieve === true) {
		return <div className="dark:text-zinc-200">Retrieving Content...</div>
	}

	return (
		<div className="grid grid-cols-4">
			<AddNewContent />
			{creatorClass.myContent.map(singleMyContent => (
				<SingleMyContent key={singleMyContent.uuid} content={singleMyContent} />
			))}
		</div>
	)
}

export default observer(MyContentMap)
