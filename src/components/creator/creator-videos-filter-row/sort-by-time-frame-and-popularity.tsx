import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../buttons/button"
import { useVideoContext } from "../../../contexts/video-context"

function SortByTimeFrameAndPopularity() {
	const videosClass = useVideoContext()

	const handleUpdateFilter = useCallback((newTimeframeSort: TimeFramesToSortBy) => {
		videosClass.updateCreatorVideosFilter("timeframeSort", newTimeframeSort)
	}, [videosClass])

	const colorClasses = useCallback((timeframeSort: TimeFramesToSortBy) => {
		let classes = "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-black dark:text-white rounded-lg"
		if (timeframeSort === videosClass.creatorVideosFilter.timeframeSort) {
			classes = "bg-black dark:bg-white dark:bg-zinc-800 text-white dark:text-black rounded-lg"
		}
		return classes
	}, [videosClass.creatorVideosFilter.timeframeSort])

	return (
		<div className="flex flex-row space-x-2 font-semibold">
			<Button
				title="Latest"
				colorClass={colorClasses("Latest")}
				hoverClass=""
				onClick={() => handleUpdateFilter("Latest")}
			/>
			<Button
				title="Popular"
				colorClass={colorClasses("Popular")}
				hoverClass=""
				onClick={() => handleUpdateFilter("Popular")}
			/>
			<Button
				title="Oldest"
				colorClass={colorClasses("Oldest")}
				hoverClass=""
				onClick={() => handleUpdateFilter("Oldest")}
			/>
		</div>
	)
}

export default observer(SortByTimeFrameAndPopularity)
