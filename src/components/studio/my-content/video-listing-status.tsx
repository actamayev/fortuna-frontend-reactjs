import { useState } from "react"
import SaveButton from "../studio-header/save-button"
import CancelEditingButton from "../studio-header/cancel-editing-button"
import capitalizeFirstLetter from "../../../utils/capitalize-first-letter"
import returnOppositeListingStatus from "../../../utils/return-opposite-listing-status"
import useUpdateVideoListingStatus from "../../../hooks/creator/update-video-listing-status"

interface Props {
	content: MyContent
}

export default function VideoListingStatus(props: Props) {
	const { content } = props
	const [isChangingListingStatus, setIsChangingListingStatus] = useState(false)
	const updateVideoListingStatus = useUpdateVideoListingStatus()

	// if it's exclusive-->
	// just show listed (with borders, blue background), no cursor pointer
	// else, show the current status (listed/unlisted). onclick, changes to the other status and a save button appears

	if (content.isContentExclusive === true) {
		return (
			<span
				className="mt-1.5 text-sm text-white text-center bg-blue-500 rounded-md px-1 py-0.5 cursor-default"
			>
				Listed
			</span>
		)
	}

	if (isChangingListingStatus === true) {
		return (
			<>
				<span
					className={`mt-1.5 text-sm text-white text-center rounded-md px-1 py-0.5 cursor-pointer
					${content.videoListingStatus === "UNLISTED" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"}`}
					onClick={() => setIsChangingListingStatus(false)}
				>
					{capitalizeFirstLetter(returnOppositeListingStatus(content.videoListingStatus as NonExclusiveVideoListingStatuses))}
				</span>
				<CancelEditingButton
					cancelEditAction={() => setIsChangingListingStatus(false)}
					extraClasses="mt-1.5 ml-1"
					customCirclePixelSize="23.5px"
				/>
				<SaveButton
					handleSaveButton={() => updateVideoListingStatus(content.uuid, setIsChangingListingStatus)}
					extraClasses="mt-1.5"
					customCirclePixelSize="23.5px"
				/>
			</>
		)
	}

	return (
		<span
			className={`mt-1.5 text-sm text-white text-center rounded-md px-1 py-0.5 cursor-pointer
				${content.videoListingStatus === "UNLISTED" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
			onClick={() => setIsChangingListingStatus(true)}
		>
			{capitalizeFirstLetter(content.videoListingStatus)}
		</span>
	)
}
