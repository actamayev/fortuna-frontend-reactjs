import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleHomePageVideo from "./single-home-page-video"
import { useVideoContext } from "../../contexts/video-context"

function HomePageVideosMap() {
	const videosClass = useVideoContext()

	const videosToShow = useMemo(() => {
		if (videosClass.homeScreenVideosToShowCategory === "Most Popular") {
			return videosClass.mostPopularHomeScreenVideos
		}
		return videosClass.recentlyPostedHomeScreenVideos
	}, [videosClass.homeScreenVideosToShowCategory, videosClass.mostPopularHomeScreenVideos, videosClass.recentlyPostedHomeScreenVideos])

	return (
		<div className="text-zinc-950 dark:text-zinc-50">
			<div className="grid grid-cols-2">
				{videosToShow.map((singleVideo, index) => (
					<div
						key={singleVideo.uuid}
						className={`flex flex-col items-start py-2 ${index % 2 === 0 ? "pr-2" : "pl-2"}`}
					>
						<SingleHomePageVideo singleHomePageVideo={singleVideo} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(HomePageVideosMap)
