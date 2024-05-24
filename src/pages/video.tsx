import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/video/video-player"
import { useVideoContext } from "../contexts/video-context"
import useSetSingleVideo from "../hooks/videos/set-single-video"
import TradeSharesCard from "../components/video/trade-shares-card"
import VideoDescriptionArea from "../components/video/video-description-area"
import useRetrieveVideoUrlData from "../hooks/videos/retrieve-video-url-data"

function Video() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const [isVideoLoading, setIsVideoLoading] = useState(false)
	const [isVideoNotFound, setIsVideoNotFound] = useState(false)
	useSetSingleVideo(videoUUID, setIsVideoLoading, setIsVideoNotFound)
	useRetrieveVideoUrlData(videoUUID)

	if (_.isUndefined(videoUUID)) return null
	if (isVideoLoading === true) return <>Loading...</>

	if (isVideoNotFound === true) return <>Unable to find video.</>

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	return (
		<div className="dark:text-white">
			<div className="grid grid-cols-12">
				<div className="col-span-9">
					<VideoPlayer videoUrl={video.videoUrl} />
				</div>
				<div className="col-span-3 flex flex-col ml-10">
					<TradeSharesCard video={video} />
				</div>
			</div>
			<div className="grid grid-cols-12">
				<div className="col-span-9">
					<VideoDescriptionArea video={video} />
				</div>
			</div>
		</div>
	)
}

export default observer(Video)
