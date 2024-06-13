import LikeButton from "./like-button"
import DislikeButton from "./dislike-button"

interface Props {
	video: SingleVideoDataFromBackend
}

export default function VideoLikeDislikeSection(props: Props) {
	const { video } = props

	return (
		<div className="flex flex-row">
			<LikeButton video={video} />
			<DislikeButton video={video} />
		</div>
	)
}
