import _ from "lodash"
import { useCallback } from "react"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

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
			className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700
			cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center"
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex-shrink-0 mr-4 relative">
				<img
					src={content.imageUrl}
					alt={content.videoName}
					className="w-64 h-36 object-cover rounded-lg"
				/>
				{content.videoListingStatus === "SOLDOUT" && (
					<div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
						Sold Out
					</div>
				)}
			</div>
			<div className="flex-grow">
				<h2 className="text-lg font-semibold dark:text-zinc-200">
					{_.truncate(content.videoName, { length: 28, omission: "..." })}
				</h2>
			</div>
		</div>
	)
}
