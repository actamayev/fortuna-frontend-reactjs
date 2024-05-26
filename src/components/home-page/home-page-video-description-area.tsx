import _ from "lodash"
import PricePerShareArea from "./price-per-share-area"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"
import SharesAvailableProgressBar from "./shares-available-progress-bar"
import useNavigateToCreator from "../../hooks/navigate/navigate-to-creator"

interface Props {
	video: VideoDataLessVideoUrl
}

export default function HomePageVideoDescriptionArea(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideo()
	const navigateToCreatorPage = useNavigateToCreator()

	const {
		splName,
		creatorProfilePictureUrl,
		creatorUsername,
		uuid,
		sharesRemainingForSale,
		totalNumberShares
	} = video

	return (
		<div className="flex items-center pt-1 dark:text-white rounded-lg mx-1">
			{creatorProfilePictureUrl && (
				<img
					src={creatorProfilePictureUrl}
					alt="Creator's Profile"
					className="w-8 h-8 rounded-full mr-2 object-cover cursor-pointer"
					onClick={() => navigateToCreatorPage(creatorUsername)}
				/>
			)}
			<div className="flex flex-col">
				<div
					className="text-md font-semibold cursor-pointer"
					style={{ maxWidth: "fit-content" }}
					onClick={() => navigateToVideoPage(uuid)}
				>
					{_.truncate(splName, { length: 24, omission: "..." })}
				</div>
				<div
					className="text-xs text-gray-600 hover:text-black dark:text-gray-300 hover:dark:text-gray-100 cursor-pointer"
					style={{ maxWidth: "fit-content" }}
					onClick={() => navigateToCreatorPage(creatorUsername)}
				>
					{creatorUsername}
				</div>
			</div>
			<div className="ml-auto flex flex-col items-end space-y-3">
				<div className="text-xs mt-1">
					<PricePerShareArea video={video} />
				</div>
				<div className="w-full">
					<SharesAvailableProgressBar
						sharesRemainingForSale={sharesRemainingForSale}
						totalShares={totalNumberShares}
					/>
				</div>
			</div>
		</div>
	)
}
