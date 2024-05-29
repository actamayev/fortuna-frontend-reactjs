import { useState } from "react"
import { observer } from "mobx-react"
import { useVideoContext } from "../contexts/video-context"
import useRetrieveHomePageVideos from "../hooks/videos/retrieve-home-page-videos"
import SingleHomePageVideoCard from "../components/home-page/single-home-page-video-card"

function Home() {
	const videoClass = useVideoContext()
	const [areVideosLoading, setAreVideosLoading] = useState(false)
	useRetrieveHomePageVideos(setAreVideosLoading)

	if (areVideosLoading === true) return <div className="dark:text-white">Loading...</div>

	return (
		<div className="grid grid-cols-4 gap-4">
			{videoClass.videos.map((video, index) => (
				<SingleHomePageVideoCard key={video.uuid} video={video} index={index}/>
			))}
		</div>
	)
}

export default observer(Home)
