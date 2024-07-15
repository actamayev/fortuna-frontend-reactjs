import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import useLikeVideo from "../../../hooks/videos/like-video"
import HoverOutlineComponent from "../../hover-outline-component"
import HoverNotAllowedComponent from "../../hover-not-allowed-component"

interface Props {
	video: SingleVideoDataFromBackend
}

function LikeButton(props: Props) {
	const { video } = props
	const [isLoading, setIsLoading] = useState(false)
	const likeVideo = useLikeVideo()

	const likeVideoCallback = useCallback(() => {
		if (isLoading === true) return
		likeVideo(video, setIsLoading)
	}, [isLoading, likeVideo, video])

	if (_.isUndefined(video.videoUrl)) {
		return (
			<HoverNotAllowedComponent>
				{video.userLikeStatus === true ? (
					<FaHeart size={22} color="red"/>
				) : (
					<FaRegHeart size={22} />
				)}
				{video.numberOfLikes > 0 && (
					<span className="ml-1.5 text-md">
						{video.numberOfLikes}
					</span>
				)}
			</HoverNotAllowedComponent>
		)
	}

	return (
		<HoverOutlineComponent
			classes="flex items-center justify-center"
			onClickAction={likeVideoCallback}
		>
			{video.userLikeStatus === true ? (
				<FaHeart size={22} color="red"/>
			) : (
				<FaRegHeart size={22} />
			)}
			{video.numberOfLikes > 0 && (
				<span className="ml-1.5 text-md">
					{video.numberOfLikes}
				</span>
			)}
		</HoverOutlineComponent>
	)
}

// Keep this observer for monitoring the like status
export default observer(LikeButton)
