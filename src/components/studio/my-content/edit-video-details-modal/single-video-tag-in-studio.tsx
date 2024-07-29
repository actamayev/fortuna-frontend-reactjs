import { useCallback } from "react"
import useRemoveVideoTag from "../../../../hooks/creator/video-tag/remove-video-tag"

interface Props {
	tag: VideoTags
	videoId: number
}

export default function SingleVideoTagInStudio(props: Props) {
	const { tag, videoId } = props
	const removeVideoTag = useRemoveVideoTag()

	const removeTagAction = useCallback(async() => {
		await removeVideoTag(tag, videoId)
	}, [removeVideoTag, tag, videoId])

	return (
		<span className="inline-flex items-center bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2">
			{tag.videoTag}
			<button
				type="button"
				className="ml-2 bg-transparent border-0 text-white focus:outline-none"
				onClick={removeTagAction}
			>
				&times;
			</button>
		</span>
	)
}
