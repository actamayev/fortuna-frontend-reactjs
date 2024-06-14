import LikeButton from "./like-button"
import DislikeButton from "./dislike-button"

interface Props {
	video: SingleVideoDataFromBackend
}

export default function VideoLikeDislikeSection(props: Props) {
	const { video } = props

	return (
		<div className="flex justify-center items-center border border-zinc-400 dark:border-zinc-600 rounded-full">
			<LikeButton video={video} />
			<div className="w-px h-6 dark:bg-zinc-300 bg-zinc-800 mx-1" />
			<DislikeButton video={video} />
		</div>
	)
}
