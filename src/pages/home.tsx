import { useState } from "react"
import { observer } from "mobx-react"
import { useVideoContext } from "../contexts/video-context"
import useRetrieveHomePageVideos from "../hooks/videos/retrieve-home-page-videos"
import SingleHomePageVideoCard from "../components/home-page/single-home-page-video-card"

function Home() {
	const videoClass = useVideoContext()
	const [areVideosLoading, setAreVideosLoading] = useState(false)
	useRetrieveHomePageVideos(setAreVideosLoading)

	const videoKeys = Array.from(videoClass.videosMap.keys())

	if (areVideosLoading === true) return <>Loading...</>

	return (
		<div className="grid grid-cols-4 gap-4 p-4">
			{videoKeys.map((item) => {
				return <SingleHomePageVideoCard key={item} videoUUID={item} />
			})}
		</div>
	)
}

export default observer(Home)
