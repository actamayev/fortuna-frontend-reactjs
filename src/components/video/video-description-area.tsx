import PricePerShareArea from "../home-page/price-per-share-area"
import useNavigateToCreator from "../../hooks/navigate/navigate-to-creator"
import SecondarySharesButton from "./purchase-secondary-shares/secondary-shares-button"

interface Props {
	video: VideoData
}

export default function VideoDescriptionArea(props: Props) {
	const { video } = props
	const navigateToCreatorPage = useNavigateToCreator()

	return (
		<div className="flex"> {/* This div will align its children side by side */}
			<div className="flex-1"> {/* Existing content takes up the space it needs */}
				<div className="text-2xl font-semibold">
					{video.splName}
				</div>
				<div className="flex items-center">
					{video.creatorProfilePictureUrl && (
						<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center mr-2">
							<img
								src={video.creatorProfilePictureUrl}
								alt="Creator's Profile"
								className="min-w-full min-h-full object-cover cursor-pointer"
								onClick={() => navigateToCreatorPage(video.creatorUsername)}
							/>
						</div>
					)}
					<span
						className="text-sm font-medium cursor-pointer"
						onClick={() => navigateToCreatorPage(video.creatorUsername)}
					>
						{video.creatorUsername}
					</span>
				</div>
				<div>
					{video.description}
				</div>
				<div>
					{video.sharesRemainingForSale} Shares Remaining for {" "}
					<PricePerShareArea video={video}/>
				</div>
                Total Outstanding shares: {video.totalNumberShares}
			</div>

			<div className="flex-1">
				<SecondarySharesButton />
			</div>
		</div>
	)
}
