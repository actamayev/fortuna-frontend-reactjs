import _ from "lodash"
import PricePerShareArea from "./price-per-share-area"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"
import SharesAvailableProgressBar from "./shares-available-progress-bar"
import useNavigateToCreator from "../../hooks/navigate/navigate-to-creator"

interface Props {
	video: VideoData
}

export default function HomePageVideoDescriptionArea(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideo()
	const navigateToCreatorPage = useNavigateToCreator()

	return (
		<div className="flex items-center pt-1 dark:text-white rounded-lg mx-1">
			{video.creatorProfilePictureUrl && (
				<img
					src={video.creatorProfilePictureUrl}
					alt="Creator's Profile"
					className="w-8 h-8 rounded-full mr-2 object-cover cursor-pointer"
					onClick={() => navigateToCreatorPage(video.creatorUsername)}
				/>
			)}
			<div className="flex flex-col">
				<div className="text-lg font-semibold cursor-pointer" onClick={() => navigateToVideoPage(video.uuid)}>
					{_.truncate(video.splName, { length: 32, omission: "..." })}
				</div>
				<div
					className="text-sm text-gray-600 hover:text-black dark:text-gray-300 hover:dark:text-gray-100 cursor-pointer"
					onClick={() => navigateToCreatorPage(video.creatorUsername)}
				>
					{video.creatorUsername}
				</div>
			</div>
			<div className="ml-auto flex flex-col items-end"> {/* This pushes your element to the right */}
				<div className="text-xs mt-1">
					<PricePerShareArea video={video} />
				</div>
				<div className="w-full">
					<SharesAvailableProgressBar
						sharesRemainingForSale={video.sharesRemainingForSale}
						totalShares={video.totalNumberShares}
					/>
				</div>
			</div>
		</div>
	)

}
