import { useState } from "react"
import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useVideoContext } from "../contexts/video-context"
import useRetrieveHomePageVideos from "../hooks/videos/retrieve-home-page-videos"
import HomeScreenSearchBar from "../components/search-bars/home-screen-search-bar"

// TODO: Make it scroll down to the footer, shouldn't show at first
function Home() {
	const videoClass = useVideoContext()
	const [areVideosLoading, setAreVideosLoading] = useState(false)
	useRetrieveHomePageVideos(setAreVideosLoading)

	if (areVideosLoading === true) return <div className="dark:text-zinc-200">Loading...</div>

	// TODO: Add: Popular channels (by # of likes?)
	// TODO: Add: recent uploads (literally the last 5 videos published)
	// TODO: Make the search bar wider
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="flex justify-center items-center w-full min-h-[50vh]">
				<div className="w-full max-w-md px-4">
					<div className="flex flex-col items-center">
						<div className="text-3xl font-semibold mb-4 text-zinc-800 dark:text-zinc-50 text-center">
							Find creators and videos
						</div>
						<HomeScreenSearchBar />
					</div>
				</div>
			</div>
			{/* <div className="grid grid-cols-4 gap-4">
				{videoClass.videos.map((video, index) => (
					<SingleHomePageVideoCard key={video.uuid} video={video} index={index}/>
				))}
			</div> */}
		</>
	)
}

export default observer(Home)
