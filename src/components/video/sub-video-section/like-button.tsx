import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import useLikeVideo from "../../../hooks/videos/like-video"
import { useAuthContext } from "../../../contexts/auth-context"
import HoverOutlineComponent from "../../hover-outline-component"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import HoverNotAllowedComponent from "../../hover-not-allowed-component"

interface Props {
	video: UrlExtendedSingleVideoData
}

function LikeButton(props: Props) {
	const { video } = props
	const authClass = useAuthContext()
	const [isLoading, setIsLoading] = useState(false)
	const likeVideo = useLikeVideo()
	const navigate = useTypedNavigate()

	const likeVideoCallback = useCallback(() => {
		if (authClass.isLoggedIn === false) {
			navigate("/register")
			return
		}
		if (isLoading === true) return
		likeVideo(video, setIsLoading)
	}, [authClass.isLoggedIn, isLoading, likeVideo, navigate, video])

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
