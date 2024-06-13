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

	if (video.userLikeStatus === true) {
		return (
			<HoverOutlineComponent
				classes="flex items-center justify-center"
				onClickAction={likeDislikeVideoCallback}
			>
				<BiSolidLike size={20}/>
				{video.numberOfLikes > 0 && (
					<span className="ml-1">
						{video.numberOfLikes}
					</span>
				)}
			</HoverOutlineComponent>
		)
	}

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={likeDislikeVideoCallback}
		>
			<BiLike size={20}/>
			<span className="ml-1">
				{video.numberOfLikes > 0 && video.numberOfLikes}
			</span>
		</HoverOutlineComponent>
	)
}

export default observer(LikeButton)
