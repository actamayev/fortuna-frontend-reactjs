import _ from "lodash"
import { useCallback } from "react"
import { FaUserCircle } from "react-icons/fa"
import ShowUsdOrSolPrice from "../show-usd-or-sol-price"
import ShowHomeVideoLockStatus from "./show-home-video-lock-status"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import getTieredAccessPriceUsd from "../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: VideoDataLessVideoUrl
	index: number
}

export default function HomePageVideoDescriptionArea(props: Props) {
	const { video, index } = props
	const navigateToVideoPage = useNavigateToVideoPage()
	const navigateToCreatorPage = useNavigateToCreatorPage()

	const { videoName, creatorProfilePictureUrl, creatorUsername, uuid } = video

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))
	}, [creatorUsername, navigateToCreatorPage])

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div className="flex items-center pt-1 dark:text-zinc-200 rounded-lg mx-1">
			{creatorProfilePictureUrl ? (
				<img
					src={creatorProfilePictureUrl}
					alt="Creator's Profile"
					className="w-8 h-8 rounded-full mr-2 object-cover cursor-pointer"
					onClick={navigateToCreatorPageCallback}
				/>
			) : (
				<FaUserCircle
					className="w-8 h-8 rounded-full mr-2 object-cover cursor-pointer text-gray-500"
					onClick={navigateToCreatorPageCallback}
				/>
			)}
			<div className="flex flex-col">
				<div
					className="text-md font-semibold cursor-pointer"
					style={{ maxWidth: "fit-content" }}
					onClick={navigateToVideoPageCallback}
				>
					{_.truncate(videoName, { length: 29, omission: "..." })}
				</div>
				<div
					className="text-xs text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-100 cursor-pointer"
					style={{ maxWidth: "fit-content" }}
					onClick={navigateToCreatorPageCallback}
				>
					{creatorUsername}
				</div>
			</div>
			<div className="ml-auto flex flex-col items-end space-y-1">
				<div className="text-xs mt-1">
					<ShowUsdOrSolPrice usdAmount={getTieredAccessPriceUsd(video)} />
				</div>
				<div className="flex items-center space-x-1">
					<ShowHomeVideoLockStatus
						isUserAbleToAccessVideo={video.isUserAbleToAccessVideo}
						index={index}
					/>
				</div>
			</div>
		</div>
	)
}
