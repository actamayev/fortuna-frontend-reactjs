import { useCallback } from "react"
import { observer } from "mobx-react"
import { useCreatorContext } from "../../contexts/creator-context"

interface Props {
	videoTag: string
}

function SingleVideoTagInCreateContent(props: Props) {
	const { videoTag } = props
	const creatorClass = useCreatorContext()

	const removeVideoTagCallback = useCallback(() => {
		creatorClass.removeVideoTag(videoTag)
	}, [creatorClass, videoTag])

	return (
		<span className="inline-flex items-center bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2">
			{videoTag}
			<button
				type="button"
				className="ml-2 bg-transparent border-0 text-white focus:outline-none"
				onClick={removeVideoTagCallback}
			>
			&times;
			</button>
		</span>
	)
}

export default observer(SingleVideoTagInCreateContent)
