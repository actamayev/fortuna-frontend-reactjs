import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../buttons/button"
import { useVideoContext } from "../../contexts/video-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

function FilterHomePageVideos() {
	const videosClass = useVideoContext()
	const navigate = useTypedNavigate()

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

	const navigateToRecentUploadsPage = useCallback(() => {
		navigate("/recent-uploads")
	}, [navigate])

	return (
		<div className="flex flex-row items-center text-zinc-600 dark:text-zinc-200 text-sm font-semibold my-3">
			<div className="flex flex-row space-x-2">
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
			<div className="flex-grow"></div>
			<div className="ml-auto items-center">
				<Button
					title="See all recent uploads"
					colorClass="bg-zinc-200 dark:bg-zinc-800"
					hoverClass="hover:bg-zinc-300 dark:hover:bg-zinc-700"
					className="rounded-lg border-none text-zinc-950 dark:text-zinc-50"
					onClick={navigateToRecentUploadsPage}
				/>
			</div>
		</div>
	)
}

export default observer(FilterHomePageVideos)
