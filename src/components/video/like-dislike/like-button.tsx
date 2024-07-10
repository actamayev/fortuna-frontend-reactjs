import { useCallback } from "react"
import { observer } from "mobx-react"
import { BiSolidLike, BiLike } from "react-icons/bi"
import HoverOutlineComponent from "../../hover-outline-component"
import useLikeDislikeVideo from "../../../hooks/videos/like-dislike-video"

interface Props {
	video: SingleVideoDataFromBackend
}

function LikeButton(props: Props) {
	const { video } = props
	const likeDislikeVideo = useLikeDislikeVideo()

	const likeDislikeVideoCallback = useCallback(() => {
		likeDislikeVideo(video, true)
	}, [likeDislikeVideo, video])

	// TODO: Need to somehow show to the user that they can't like/dislike a video they dont own.
	// Maybe a tooltip?
	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={likeDislikeVideoCallback}
		>
			{video.userLikeStatus === true ? (
				<BiSolidLike size={20}/>
			) : (
				<BiLike size={20}/>
			)}
			{video.numberOfLikes > 0 && (
				<span className="ml-1.5 text-md">
					{video.numberOfLikes}
				</span>
			)}
		</HoverOutlineComponent>
	)
}

// Keep this observer for monitoring the like/dislike status
export default observer(LikeButton)
