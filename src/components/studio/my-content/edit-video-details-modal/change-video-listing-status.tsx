import { observer } from "mobx-react"
import { useCallback, useState } from "react"
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
		const baseClass = "cursor-pointer p-2 rounded"
		const activeClass = "bg-zinc-200 dark:bg-zinc-900"
		const inactiveClass = "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-900"

		return videoListingStatus === status ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`
	}, [videoListingStatus])

	return (
		<div className="flex items-center w-full mt-2">
			<div className="relative flex flex-row">
				<label className="text-sm text-zinc-700 dark:text-zinc-300 ml-0.5 font-semibold">
					Visibility
				</label>
				<div
					className={getStatusButtonClass("LISTED")}
					onClick={() => handleStatusChange("LISTED")}
				>
					Listed
				</div>
				<div
					className={getStatusButtonClass("UNLISTED")}
					onClick={() => handleStatusChange("UNLISTED")}
				>
					Unlisted
				</div>
			</div>
			{content.videoListingStatus !== videoListingStatus && (
				<SaveButton handleSaveButton={() => updateVideoListingStatus(content.uuid)} />
			)}
		</div>
	)
}

export default observer(ChangeVideoListingStatus)
