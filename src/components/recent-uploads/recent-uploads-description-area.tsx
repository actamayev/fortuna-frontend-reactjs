import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import ShowUsdOrSolPrice from "../usd-or-sol/show-usd-or-sol-price"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import ShowRecentUploadsLockStatus from "./show-recent-uploads-lock-status"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"
import getTieredAccessPriceUsd from "../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: VideoDataWithUrlRetrievalStatus
	index: number
}

function HomePageVideoDescriptionArea(props: Props) {
	const { video, index } = props
	const navigateToVideoPage = useNavigateToVideoPage()
	const navigateToCreatorPage = useNavigateToCreatorPage()
	const { videoName, creatorProfilePictureUrl, creatorUsername, uuid, channelName } = video

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))
	}, [creatorUsername, navigateToCreatorPage])

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div className="flex items-center dark:text-zinc-200 rounded-lg mx-1">
			<div className="flex-shrink-0">
				<ShowUserProfileImageOrDefaultImage
					profileImageUrl={creatorProfilePictureUrl}
					extraClasses="w-6 h-6 rounded-full mr-2 object-cover cursor-pointer"
					onClickCreatorPicture={navigateToCreatorPageCallback}
				/>
			</div>
			<div className="flex flex-col">
				<div
					className="text-xs font-semibold cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
					style={{ maxWidth: "fit-content" }}
					onClick={navigateToVideoPageCallback}
				>
					{_.truncate(videoName, { length: 30 })}
				</div>
				<div
					className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-100 cursor-pointer"
					style={{
						maxWidth: "fit-content",
						fontSize: "10px",
						lineHeight: "14px"
					}}
					onClick={navigateToCreatorPageCallback}
				>
					{_.truncate(channelName, { length: 23 })}
				</div>
			</div>
			<div className="ml-auto flex flex-col items-end">
				<div
					className="mt-1"
					style={{
						fontSize: "10px",
						lineHeight: "14px"
					}}
				>
					<ShowUsdOrSolPrice
						usdAmount={getTieredAccessPriceUsd(video)}
						roundOrFixed="round"
					/>
				</div>
				<div className="flex items-center text-zinc-800 dark:text-zinc-200">
					<ShowRecentUploadsLockStatus
						isUserAbleToAccessVideo={video.isUserAbleToAccessVideo}
						index={index}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(HomePageVideoDescriptionArea)
