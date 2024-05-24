import Thumbnail from "./thumbnail"
import HomePageVideoDescriptionArea from "./home-page-video-description-area"

interface Props {
	video: VideoDataLessVideoUrl
}

export default function SingleHomePageVideoCard(props: Props) {
	const { video } = props

	return (
		<div className="flex flex-col w-full">
			<Thumbnail video={video}/>
			<HomePageVideoDescriptionArea video={video} />
		</div>
	)
}
