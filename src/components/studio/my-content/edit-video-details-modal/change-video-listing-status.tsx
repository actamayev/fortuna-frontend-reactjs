import { observer } from "mobx-react"
import { FaLock } from "react-icons/fa"
import { useCallback, useState } from "react"
import Tooltip from "../../../tooltip"
import SaveButton from "../../save-button"
import useUpdateVideoListingStatus from "../../../../hooks/creator/update-video-listing-status"

interface Props {
	content: MyContent
}

function ChangeVideoListingStatus(props: Props) {
	const { content } = props
	const [videoListingStatus, setVideoListingStatus] = useState<AllVideoListingStatuses>(content.videoListingStatus)
	const updateVideoListingStatus = useUpdateVideoListingStatus()

	const handleStatusChange = useCallback((newStatus: AllVideoListingStatuses) => {
		if (content.isContentExclusive) return
		setVideoListingStatus(newStatus)
	}, [content.isContentExclusive])

	const getStatusButtonClass = useCallback((status: AllVideoListingStatuses) => {
		const baseClass = "p-2 rounded flex items-center"
		const activeClass = "bg-zinc-300 dark:bg-zinc-900"
		const inactiveClass = "bg-white dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-900"

		return videoListingStatus === status ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`
	}, [videoListingStatus])

	const getCursorClass = useCallback((status: AllVideoListingStatuses) => {
		if (content.isContentExclusive && status === "UNLISTED") {
			return "cursor-not-allowed"
		}
		return "cursor-pointer"
	}, [content.isContentExclusive])

	return (
		<div className="flex flex-col items-start w-full mt-2">
			<label className="text-sm text-zinc-700 dark:text-zinc-300 ml-0.5 font-semibold">
				Visibility
			</label>
			<div className="flex flex-row mt-2">
				<div
					className={`${getStatusButtonClass("LISTED")} ${getCursorClass("LISTED")}`}
					onClick={() => handleStatusChange("LISTED")}
				>
					Listed
					{content.isContentExclusive && (
						<Tooltip
							message="Unable to change listing status since this is an exclusive video"
							width="250px"
						>
							<FaLock className="ml-1" />
						</Tooltip>
					)}
				</div>
				<div
					className={`${getStatusButtonClass("UNLISTED")} ${getCursorClass("UNLISTED")} mx-2`}
					onClick={() => handleStatusChange("UNLISTED")}
				>
					Unlisted
				</div>
				{content.videoListingStatus !== videoListingStatus && (
					<div className="mt-0.5">
						<SaveButton
							handleSaveButton={() => updateVideoListingStatus(content.uuid)}
							customCirclePixelSize="35px"
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default observer(ChangeVideoListingStatus)
