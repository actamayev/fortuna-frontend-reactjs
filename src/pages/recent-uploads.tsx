import { useMemo } from "react"
import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useVideoContext } from "../contexts/video-context"
import SingleRecentUploadsCard from "../components/recent-uploads/single-recent-uploads-card"
import useRetrieveRecentUploadsUseEffect from "../hooks/videos/retrieve-recent-uploads-use-effect"

function RecentUploads() {
	const videoClass = useVideoContext()
	useRetrieveRecentUploadsUseEffect()

	const areRecentlyUploadedBeingRetrieved = useMemo(() => {
		return videoClass.areRecentlyUploadedBeingRetrieved
	}, [videoClass.areRecentlyUploadedBeingRetrieved])

	if (areRecentlyUploadedBeingRetrieved === true) {
		return <div className="dark:text-zinc-200">Loading...</div>
	}

	return (
		<>
			<PageHelmet pageTitle="/recent-uploads" />
			<div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-200 mb-2">
				Recent Uploads
			</div>
			<div className="grid grid-cols-5 gap-3">
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
