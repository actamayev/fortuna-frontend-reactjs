import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../buttons/button"
import { useVideoContext } from "../../contexts/video-context"

function FilterHomePageVideos() {
	const videosClass = useVideoContext()

	const handleUpdateFilter = useCallback((newCategory: HomeScreenVideosToShowCategory) => {
		videosClass.updateHomeScreenVideosToShowCategory(newCategory)
	}, [videosClass])

	const colorClasses = useCallback((homeScreenVideosToShowCategory: HomeScreenVideosToShowCategory) => {
		let classes = "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-black dark:text-white rounded-lg"
		if (homeScreenVideosToShowCategory === videosClass.homeScreenVideosToShowCategory) {
			classes = "bg-black dark:bg-white text-white dark:text-black rounded-lg"
		}
		return classes
	}, [videosClass.homeScreenVideosToShowCategory])

	return (
		<div className="flex flex-row text-zinc-600 dark:text-zinc-200 text-sm">
			<div className="border border-zinc-700 dark:border-zinc-300 p-1 mr-2 rounded-xl">
				<div className="flex flex-row space-x-2 font-semibold">
					<Button
						title="Most Popular"
						colorClass={colorClasses("Most Popular")}
						hoverClass=""
						onClick={() => handleUpdateFilter("Most Popular")}
					/>
					<Button
						title="Recent Uploads"
						colorClass={colorClasses("Recent Uploads")}
						hoverClass=""
						onClick={() => handleUpdateFilter("Recent Uploads")}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(FilterHomePageVideos)
