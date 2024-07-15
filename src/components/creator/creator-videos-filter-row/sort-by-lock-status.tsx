import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../buttons/button"
import { useVideoContext } from "../../../contexts/video-context"

function SortByLockStatus() {
	const videosClass = useVideoContext()

	const handleUpdateFilter = useCallback((lockFilter: LockFilter) => {
		videosClass.updateCreatorVideosFilter("lockFilter", lockFilter)
	}, [videosClass])

	const colorClasses = useCallback((lockFilter: LockFilter) => {
		let classes = "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-black dark:text-white rounded-lg"
		if (lockFilter === videosClass.creatorVideosFilter.lockFilter) {
			classes = "bg-black dark:bg-white dark:bg-zinc-800 text-white dark:text-black rounded-lg"
		}
		return classes
	}, [videosClass.creatorVideosFilter.lockFilter])

	return (
		<div className="flex flex-row space-x-2 font-semibold">
			<Button
				title="All"
				colorClass={colorClasses("All")}
				hoverClass=""
				onClick={() => handleUpdateFilter("All")}
			/>
			<Button
				title="Locked"
				colorClass={colorClasses("Locked")}
				hoverClass=""
				onClick={() => handleUpdateFilter("Locked")}
			/>
			<Button
				title="Unlocked"
				colorClass={colorClasses("Unlocked")}
				hoverClass=""
				onClick={() => handleUpdateFilter("Unlocked")}
			/>
		</div>
	)
}

export default observer(SortByLockStatus)
