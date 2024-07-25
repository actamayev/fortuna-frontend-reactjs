import { useState } from "react"
import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useVideoContext } from "../contexts/video-context"
import useRetrieveRecentUploads from "../hooks/videos/retrieve-recent-uploads"
import SingleRecentUploadsCard from "../components/recent-uploads/single-recent-uploads-card"

function RecentUploads() {
	const videoClass = useVideoContext()
	const [areVideosLoading, setAreVideosLoading] = useState(false)
	useRetrieveRecentUploads(setAreVideosLoading)

	if (areVideosLoading === true) {
		return <div className="dark:text-zinc-200">Loading...</div>
	}

	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="grid grid-cols-4 gap-4">
				{videoClass.videos.map((video, index) => (
					<SingleRecentUploadsCard
						key={video.uuid}
						index={index}
						video={video}
					/>
				))}
			</div>
		</>
	)
}

export default observer(RecentUploads)
