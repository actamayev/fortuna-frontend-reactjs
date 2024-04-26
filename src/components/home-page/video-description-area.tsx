import PricePerShareArea from "./price-per-share-area"

interface Props {
	video: VideoData
}

export default function VideoDescriptionArea(props: Props) {
	const { video } = props

	return (
		<div className="flex items-center pt-1 dark:text-white rounded-lg">
			{video.creatorProfilePictureUrl && (
				<img
					src={video.creatorProfilePictureUrl}
					alt="Creator's Profile"
					className="w-8 h-8 rounded-full mr-2 object-cover"
				/>
			)}
			<div className="flex flex-col flex-grow">
				<div className="text-lg font-semibold">
					{video.splName}
				</div>
				<div className="text-sm">
					{video.creatorUsername}
				</div>
				<div className="text-xs mt-1">
					<PricePerShareArea video={video} />
				</div>
				<div className="text-xs">
					<span className="font-bold">Shares Available:</span> {video.sharesRemainingForSale}
				</div>
			</div>
		</div>
	)
}
