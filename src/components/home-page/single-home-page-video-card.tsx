import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import useTypedNavigate from "../../hooks/typed-navigate"
import { useVideoContext } from "../../contexts/video-context"

interface Props {
	videoUUID: string
}

function SingleHomePageVideoCard(props: Props) {
	const { videoUUID } = props
	const videoClass = useVideoContext()
	const video = videoClass.contextForVideo(videoUUID)
	const navigate = useTypedNavigate()

	const navigateToVideoPage = useCallback((uuid: string) => {
		navigate(`/v/${uuid}`)
	}, [navigate])

	if (_.isUndefined(video)) return null

	return (
		<div className="flex flex-col items-center cursor-pointer" onClick={() => navigateToVideoPage(video.uuid)}>
			<img
				src={video.imageUrl}
				alt={video.splName}
				className="w-full h-80 object-cover rounded-lg"
			/>
			<div className="mt-2 text-sm text-center">{video.splName}</div>
		</div>
	)
}

export default observer(SingleHomePageVideoCard)
