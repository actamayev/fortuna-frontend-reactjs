import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/video/video-player"
import BasicHelmet from "../components/helmet/basic-helmet"
import { useVideoContext } from "../contexts/video-context"
import { addLeadingAt } from "../utils/leading-at-operations"
import useSetSingleVideo from "../hooks/videos/set-single-video"
import SubVideoSection from "../components/video/sub-video-section"
import useRetrieveVideoUrlData from "../hooks/videos/retrieve-video-url-data"
import MoreVideosMap from "../components/video/more-videos-area/more-videos-map"
import PurchaseExclusiveAccessCard from "../components/video/purchase-exclusive-access-card"
import useRetrieveCreatorVideosAndDataUseEffect from "../hooks/videos/retrieve-creator-videos-and-data-use-effect"

function Video() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const [isVideoLoading, setIsVideoLoading] = useState(false)
	const [isVideoNotFound, setIsVideoNotFound] = useState(false)
	useSetSingleVideo(videoUUID, setIsVideoLoading, setIsVideoNotFound)
	useRetrieveVideoUrlData(videoUUID)
	const video = videoClass.findVideoFromUUID(videoUUID)
	useRetrieveCreatorVideosAndDataUseEffect(addLeadingAt(video?.creatorUsername))

	if (isVideoLoading === true) {
		return (
			<>
				<BasicHelmet pageTitleData="Fortuna | Exclusive Videos" />
				<div className="dark:text-zinc-200 text-zinc-950">
					Loading...
				</div>
			</>
		)
	}

	if (isVideoNotFound === true) {
		return (
			<>
				<BasicHelmet pageTitleData="Video not found | Fortuna" />
				<div className="dark:text-zinc-200 text-zinc-950">
					Unable to find video
				</div>
			</>
		)
	}

	if (_.isUndefined(video)) return null

	return (
		<>
			<BasicHelmet pageTitleData={`${video.videoName} | Fortuna`} />
			<div className="dark:text-white text-zinc-950 relative">
				<div className="grid grid-cols-12">
					<div className="col-span-9">
						<VideoPlayer video={video} />
					</div>
					<div className="col-span-3 flex flex-col pl-14">
						<div className="w-full h-full">
							<PurchaseExclusiveAccessCard videoUUID={video.uuid} />
						</div>
					</div>
				</div>
				<div className="grid grid-cols-12">
					<div className="col-span-9">
						<SubVideoSection video={video} />
					</div>
				</div>
				<div className="flex flex-col">
					<div className="w-full overflow-x-auto">
						<MoreVideosMap video={video} />
					</div>
				</div>
			</div>
		</>
	)
}

export default observer(Video)
