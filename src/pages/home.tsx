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
		<div
			className = "card-container"
			style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}
		>
			{videoKeys.map((item) => {
				return <SingleHomePageVideoCard key={item} videoUUID={item} />
			})}
		</div>
	)
}

export default observer(Home)
