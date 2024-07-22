import { observer } from "mobx-react"
import SingleHomePageVideo from "./single-home-page-video"
import { useVideoContext } from "../../contexts/video-context"

function HomePageVideosMap() {
	const videosClass = useVideoContext()

	return (
		<div className="text-zinc-950 dark:text-zinc-50">
			<div className="mt-4 mb-2">Recent Uploads</div>
			<div className="grid grid-cols-2">
				{videosClass.homeScreenVideos.map((singleVideo, index) => (
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
