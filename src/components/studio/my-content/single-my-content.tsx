import _ from "lodash"
import { observer } from "mobx-react"
import VideoListingStatus from "./video-listing-status"
import dateFormatter from "../../../utils/date-formatter"

interface Props {
	content: MyContent
}

function SingleMyContent(props: Props) {
	const { content } = props

	return (
		<div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 pt-4 pb-3 border border-zinc-200 dark:border-zinc-700">
			<div className="flex-shrink-0 mr-4 relative">
				<img
					src={content.imageUrl}
					alt={content.videoName}
					className="w-64 h-36 object-cover rounded-lg"
					style={{
						opacity: content.videoListingStatus === "UNLISTED" ? 0.6 : 1
					}}
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
				<div className="text-xl dark:text-zinc-50 font-medium">
					{_.truncate(content.videoName, { length: 50, omission: "..." })}
				</div>
				<div className="text-sm dark:text-zinc-400">
					{_.truncate(content.description, { length: 100, omission: "..." })}
				</div>
				<div className="text-sm dark:text-zinc-400">
					{dateFormatter(content.createdAt)}
				</div>
			</div>
		</div>
	)
}

export default observer(SingleMyContent)
