import _ from "lodash"
// import { useCallback } from "react"
import VideoListingStatus from "./video-listing-status"
// import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	content: MyContent
}

export default function SingleMyContent(props: Props) {
	const { content } = props
	// const navigateToVideoPage = useNavigateToVideoPage()

	// const navigateToVideoPageCallback = useCallback(() => {
	// 	navigateToVideoPage(content.uuid)
	// }, [content.uuid, navigateToVideoPage])

	return (
		<div
			className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 pt-4 pb-3 border border-zinc-200 dark:border-zinc-700"
			// cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 flex"
			// onClick={navigateToVideoPageCallback}
		>
			<div className="flex-shrink-0 mr-4 relative">
				<img
					src={content.imageUrl}
					alt={content.videoName}
					className="w-64 h-36 object-cover rounded-lg"
				/>
				{content.videoListingStatus === "SOLDOUT" && (
					<div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
						Sold Out
					</div>
				)}
				<div className="flex justify-center">
					<VideoListingStatus content={content}/>
				</div>
			</div>
			<div className="flex-grow">
				<h2 className="text-lg font-semibold dark:text-zinc-200">
					{_.truncate(content.videoName, { length: 50, omission: "..." })}
				</h2>
			</div>
		</div>
	)
}
