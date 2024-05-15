import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/video/video-player"
import { useVideoContext } from "../contexts/video-context"
import useSetSingleVideo from "../hooks/videos/set-single-video"
import PurchaseSharesCard from "../components/video/purchase-primary-shares/purchase-shares-card"
import VideoDescriptionArea from "../components/video/video-description-area"

function Video() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const [isVideoLoading, setIsVideoLoading] = useState(false)
	const [isVideoNotFound, setIsVideoNotFound] = useState(false)
	useSetSingleVideo(videoUUID, setIsVideoLoading, setIsVideoNotFound)

	if (_.isUndefined(videoUUID)) return null
	if (isVideoLoading === true) return <>Loading...</>

	if (isVideoNotFound === true) return <>Unable to find video.</>

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	return (
		<div className="dark:text-white">
			<div className="flex">
				<div className="flex-1">
					<VideoPlayer videoUrl={video.videoUrl} />
					<VideoDescriptionArea video={video} />
				</div>
				<div className="flex-1 ml-4 flex flex-col justify-start">
					<div className="h-full">
						<PurchaseSharesCard />
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(Video)
