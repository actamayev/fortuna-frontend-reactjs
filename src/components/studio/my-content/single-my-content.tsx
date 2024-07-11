import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import VideoName from "./video-name"
import LinkToVideo from "./link-to-video"
import EarningsSection from "./earnings-section"
import VideoDescription from "./video-description"
import VideoListingStatus from "./video-listing-status"
import { formatGBDate } from "../../../utils/date-formatter"
import MyContentThumbnail from "./thumbnail/my-content-thumbnail"
import LikesDislikesRatioSection from "./likes-dislikes-ratio-section"
import EditVideoDetailsModal from "./edit-video-details-modal/edit-video-details-modal"

interface Props {
	content: MyContent
}

function SingleMyContent(props: Props) {
	const { content } = props
	const [isVideoEditingModalOpen, setIsVideoEditingModalOpen] = useState(false)

	const toggleModalOpen = useCallback(() => {
		setIsVideoEditingModalOpen(prev => !prev)
	}, [])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsVideoEditingModalOpen(false)
			}
		}

		if (isVideoEditingModalOpen) {
			window.addEventListener("keydown", handleKeyDown)
		} else {
			window.removeEventListener("keydown", handleKeyDown)
		}

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [isVideoEditingModalOpen])

	return (
		<div className="grid grid-cols-12 gap-4 bg-white dark:bg-neutral-900 py-2 border-b border-zinc-200 dark:border-zinc-800">
			<div className="col-span-2 relative">
				<MyContentThumbnail content={content} />
			</div>
			<div className="col-span-3">
				<div className="flex-grow">
					<VideoName content={content} toggleModalOpen={toggleModalOpen} />
					<VideoDescription content={content} toggleModalOpen={toggleModalOpen} />
				</div>
			</div>
			<div className="flex col-span-1">
				<VideoListingStatus
					content={content}
					toggleModalOpen={toggleModalOpen}
				/>
			</div>
			<div className="col-span-1 text-sm text-zinc-700 dark:text-zinc-300">
				{formatGBDate(content.createdAt)}
			</div>
			<div className="col-span-2 text-sm text-zinc-700 dark:text-zinc-300">
				<LikesDislikesRatioSection content={content} />
			</div>
			<div className="col-span-2 text-sm text-zinc-700 dark:text-zinc-300">
				<EarningsSection content={content} />
			</div>
			<div className="col-span-1 text-sm text-black dark:text-white">
				<LinkToVideo content={content} />
			</div>
			{isVideoEditingModalOpen && (
				<EditVideoDetailsModal
					content={content}
					toggleModalOpen={toggleModalOpen}
				/>
			)}
		</div>
	)
}

export default observer(SingleMyContent)
