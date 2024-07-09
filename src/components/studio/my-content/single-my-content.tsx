import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import VideoName from "./video-name"
import VideoDescription from "./video-description"
import VideoListingStatus from "./video-listing-status"
import { formatGBDate } from "../../../utils/date-formatter"
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
		<div className="grid grid-cols-12 gap-4 bg-white dark:bg-neutral-900
			p-4 border-b border-gray-200 dark:border-gray-800"
		>
			<div className="col-span-2 relative">
				<div className="aspect-w-16 aspect-h-9">
					<img
						src={content.imageUrl}
						alt={content.videoName}
						className="object-cover rounded-lg"
						style={{
							filter: content.videoListingStatus === "UNLISTED" ? "brightness(0.6)" : "none"
						}}
					/>
					{content.videoListingStatus === "SOLDOUT" && (
						<div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
						Sold Out
						</div>
					)}
				</div>
			</div>
			<div className="col-span-2">
				<div className="flex-grow">
					<VideoName content={content} toggleModalOpen={toggleModalOpen} />
					<VideoDescription content={content} toggleModalOpen={toggleModalOpen} />
				</div>
			</div>
			<div className="flex col-span-2">
				<VideoListingStatus content={content}/>
			</div>
			<div className="text-sm text-zinc-700 dark:text-zinc-300 col-span-2">
				{formatGBDate(content.createdAt)}
			</div>
			{isVideoEditingModalOpen && (
				<EditVideoDetailsModal
					videoUUID={content.uuid}
					toggleModalOpen={toggleModalOpen}
				/>
			)}
		</div>
	)
}

export default observer(SingleMyContent)
