import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleMyContent from "./single-my-content"
import MyContentHeader from "./my-content-header/my-content-header"
import { useCreatorContext } from "../../../contexts/creator-context"
import useMyContentToShow from "../../../hooks/creator/my-content-to-show"

function MyContentMap() {
	const creatorClass = useCreatorContext()
	const myContentToShow = useMyContentToShow()

	const isRetrievingContent = useMemo(() => {
		return creatorClass.isRetrievingContent
	}, [creatorClass.isRetrievingContent])

	const hasContentToRetrieve = useMemo(() => {
		return creatorClass.hasContentToRetrieve
	}, [creatorClass.hasContentToRetrieve])

	if (isRetrievingContent === true || hasContentToRetrieve === true) {
		return <div className="dark:text-zinc-200">Retrieving Content...</div>
	}

	return (
		<div className="flex flex-col">
			<MyContentHeader />
			{myContentToShow.map(singleMyContent => (
				<SingleMyContent key={singleMyContent.uuid} content={singleMyContent} />
			))}
		</div>
	)
}

export default observer(MyContentMap)
