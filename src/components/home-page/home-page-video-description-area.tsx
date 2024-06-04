import _ from "lodash"
import PricePerShareArea from "./price-per-share-area"
import ShowHomeVideoLockStatus from "./show-home-video-lock-status"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import SharesAvailableProgressBar from "./shares-available-progress-bar"
import useNavigateToCreator from "../../hooks/navigate/navigate-to-creator"

interface Props {
	video: VideoDataLessVideoUrl
	index: number
}

export default function HomePageVideoDescriptionArea(props: Props) {
	const { video, index } = props
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
					onClick={() => navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))}
				/>
			)}
			<div className="flex flex-col">
				<div
					className="text-md font-semibold cursor-pointer"
					style={{ maxWidth: "fit-content" }}
					onClick={() => navigateToVideoPage(uuid)}
				>
					{_.truncate(splName, { length: 20, omission: "..." })}
				</div>
				<div
					className="text-xs text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-100 cursor-pointer"
					style={{ maxWidth: "fit-content" }}
					onClick={() => navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))}
				>
					{creatorUsername}
				</div>
			</div>
			<div className="ml-auto flex flex-col items-end space-y-2.5">
				<div className="text-xs mt-1">
					<PricePerShareArea video={video} />
				</div>
				<div className="flex items-center space-x-1">
					<SharesAvailableProgressBar
						sharesRemainingForSale={sharesRemainingForSale}
						totalShares={totalNumberShares}
					/>
					<ShowHomeVideoLockStatus video={video} index={index}/>
				</div>
			</div>
		</div>
	)
}
