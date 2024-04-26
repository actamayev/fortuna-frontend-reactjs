import Thumbnail from "./thumbnail"
import VideoDescriptionArea from "./video-description-area"

interface Props {
	video: VideoData
}

export default function SingleHomePageVideoCard(props: Props) {
	const { video } = props

	return (
		<div className="flex flex-col w-full">
			<Thumbnail video={video}/>
			<VideoDescriptionArea video={video} />
		</div>
	)
}
