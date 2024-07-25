import RecentUploadsThumbnail from "./recent-uploads-thumbnail"
import RecentUploadsDescriptionArea from "./recent-uploads-description-area"

interface Props {
	video: VideoDataWithUrlRetrievalStatus
	index: number
}

export default function SingleRecentUploadsCard(props: Props) {
	const { video, index } = props

	return (
		<div className="flex flex-col w-full">
			<RecentUploadsThumbnail video={video} />
			<RecentUploadsDescriptionArea index={index} video={video} />
		</div>
	)
}
