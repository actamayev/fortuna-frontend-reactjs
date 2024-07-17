import HomePageThumbnail from "./home-page-thumbnail"
import HomePageVideoDescriptionArea from "./home-page-video-description-area"

interface Props {
	video: VideoDataWithUrlRetrievalStatus
	index: number
}

export default function SingleHomePageVideoCard(props: Props) {
	const { video, index } = props

	return (
		<div className="flex flex-col w-full">
			<HomePageThumbnail video={video}/>
			<HomePageVideoDescriptionArea video={video} index={index}/>
		</div>
	)
}
