import { useCallback } from "react"

interface Props {
	videoTag: string
	removeTagAction: () => void
}

export default function SingleVideoTag(props: Props) {
	const { videoTag, removeTagAction } = props

	const removeTagActionCallback = useCallback(() => {
		removeTagAction()
	}, [removeTagAction])

	return (
		<span className="inline-flex items-center bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2">
			{videoTag}
			<button
				type="button"
				className="ml-2 bg-transparent border-0 text-white focus:outline-none"
				onClick={removeTagActionCallback}
			>
				&times;
			</button>
		</span>
	)
}
