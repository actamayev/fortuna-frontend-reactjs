import { useCallback } from "react"
import { observer } from "mobx-react"
import { BiDislike, BiSolidDislike } from "react-icons/bi"
import HoverOutlineComponent from "../../hover-outline-component"
import useLikeDislikeVideo from "../../../hooks/videos/like-dislike-video"

interface Props {
	video: SingleVideoDataFromBackend
}

function DislikeButton(props: Props) {
	const { video } = props
	const likeDislikeVideo = useLikeDislikeVideo()

	const likeDislikeVideoCallback = useCallback(() => {
		likeDislikeVideo(video, false)
	}, [likeDislikeVideo, video])

	if (video.userLikeStatus === false) {
		return (
			<HoverOutlineComponent
				classes="flex items-center justify-center"
				onClickAction={likeDislikeVideoCallback}
			>
				<BiSolidDislike size={20}/>
				<span className="ml-1">
					{video.numberOfDislikes > 0 && video.numberOfDislikes}
				</span>
			</HoverOutlineComponent>
		)
	}

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={likeDislikeVideoCallback}
		>
			<BiDislike size={20}/>
			<span className="ml-1">
				{video.numberOfDislikes > 0 && video.numberOfDislikes}
			</span>
		</HoverOutlineComponent>
	)
}

export default observer(DislikeButton)
