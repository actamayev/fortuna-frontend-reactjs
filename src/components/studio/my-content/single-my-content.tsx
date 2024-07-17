import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import VideoName from "./video-name"
import LinkToVideo from "./link-to-video"
import EarningsSection from "./earnings-section"
import VideoDescription from "./video-description"
import VideoListingStatus from "./video-listing-status"
import MyContentThumbnail from "./thumbnail/my-content-thumbnail"
import { useAbbreviatedDateFormatter } from "../../../hooks/date-formatter"
import EditVideoDetailsModal from "./edit-video-details-modal/edit-video-details-modal"

interface Props {
	content: MyContent
}

function SingleMyContent(props: Props) {
	const { content } = props
	const abbreviatedDateFormatter = useAbbreviatedDateFormatter()
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
			<div className="col-span-4">
				<VideoName content={content} toggleModalOpen={toggleModalOpen} />
				<VideoDescription content={content} toggleModalOpen={toggleModalOpen} />
			</div>
			<div className="flex col-span-1">
				<div
					className=" text-sm dark:text-white text-black rounded-md
					px-1 py-0.5 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 w-full"
					onClick={toggleModalOpen}
				>
					<div className="inline-flex items-center">
						<VideoListingStatus content={content} />
					</div>
				</div>
			</div>
			<div className="col-span-1 text-sm text-zinc-700 dark:text-zinc-300">
				{abbreviatedDateFormatter(content.createdAt)}
			</div>
			<div className="col-span-1 text-sm text-zinc-600 dark:text-zinc-300">
				<div className="flex flex-col items-start">
					{content.numberOfLikes} like{content.numberOfLikes !== 1 && "s"}
				</div>
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
