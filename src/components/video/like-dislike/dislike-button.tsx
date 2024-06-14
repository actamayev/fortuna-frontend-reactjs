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

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={likeDislikeVideoCallback}
		>
			{video.userLikeStatus === false ? (
				<BiSolidDislike size={20}/>
			) : (
				<BiDislike size={20}/>
			)}
			{video.numberOfDislikes > 0 && (
				<span className="ml-1.5 text-md">
					{video.numberOfDislikes}
				</span>
			)}
		</HoverOutlineComponent>
	)
}

export default observer(DislikeButton)
