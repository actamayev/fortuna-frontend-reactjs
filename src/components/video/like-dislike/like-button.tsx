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
				<BiSolidLike />
				{video.numberOfLikes > 0 && video.numberOfLikes}
			</HoverOutlineComponent>
		)
	}

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={likeDislikeVideoCallback}
		>
			<BiLike />
			{video.numberOfLikes > 0 && video.numberOfLikes}
		</HoverOutlineComponent>
	)
}

export default observer(LikeButton)
