import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import VideoName from "./video-name"
import VideoDescription from "./video-description"
import VideoListingStatus from "./video-listing-status"
import dateFormatter from "../../../utils/date-formatter"
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
		<>
			<div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 pt-4 pb-3 border border-zinc-200 dark:border-zinc-700">
				<div className="flex-shrink-0 mr-4 relative">
					<img
						src={content.imageUrl}
						alt={content.videoName}
						className="w-64 h-36 object-cover rounded-lg"
						style={{
							filter: content.videoListingStatus === "UNLISTED" ? "brightness(0.6)" : "none"
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
					<VideoName content={content} toggleModalOpen={toggleModalOpen} />
					<VideoDescription content={content} toggleModalOpen={toggleModalOpen} />
					<div className="text-sm text-zinc-600 dark:text-zinc-400 ml-1.5">
						{dateFormatter(content.createdAt)}
					</div>
				</div>
				{isVideoEditingModalOpen && (
					<EditVideoDetailsModal
						videoUUID={content.uuid}
						toggleModalOpen={toggleModalOpen}
					/>
				)}
			</div>
		</>
	)
}

export default observer(SingleMyContent)
