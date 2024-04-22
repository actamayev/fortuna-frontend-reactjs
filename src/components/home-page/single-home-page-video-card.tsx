import _ from "lodash"
import { observer } from "mobx-react"
import { useVideoContext } from "../../contexts/video-context"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	videoUUID: string
}

function SingleHomePageVideoCard(props: Props) {
	const { videoUUID } = props
	const videoClass = useVideoContext()
	const video = videoClass.contextForVideo(videoUUID)
	const navigateToVideoPage = useNavigateToVideo()

	if (_.isUndefined(video)) return null

	return (
		<div
			className="flex flex-col items-center cursor-pointer w-full"
			onClick={() => navigateToVideoPage(video.uuid)}
		>
			<img
				src={video.imageUrl}
				alt={video.splName}
				className="w-full h-80 object-cover rounded-lg"
			/>
			<div className="mt-2 text-2xl font-semibold text-left dark:text-white w-full">
				{video.splName}
			</div>
		</div>
	)
}

export default observer(SingleHomePageVideoCard)
