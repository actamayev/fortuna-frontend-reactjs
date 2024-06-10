import _ from "lodash"
import { useCallback } from "react"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	content: MyContent
}

export default function SingleMyContent(props: Props) {
	const { content } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(content.uuid)
	}, [content.uuid, navigateToVideoPage])

	return (
		<div
			className="bg-white dark:bg-zinc-800 rounded-lg p-4 m-2 grid grid-cols-1 \
				grid-rows-1 border hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
			style={{ width: "288px", height: "225px" }}
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex flex-col h-full">
				<h2 className="text-lg font-semibold mb-2 dark:text-zinc-200">
					{_.truncate(content.videoName, { length: 28, omission: "..." })}
				</h2>
				<div className="relative h-full">
					<img
						src={content.imageUrl}
						className="w-full h-full object-cover"
						alt={content.videoName}
						style={{ aspectRatio: "16/9" }}
					/>
				</div>
			</div>
		</div>
	)
}
