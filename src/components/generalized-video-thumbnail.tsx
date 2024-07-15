import { observer } from "mobx-react"
import SoldOutSticker from "./sold-out-sticker"
import VideoDurationSticker from "./video-duration-sticker"

interface Props {
	thumbnailData: {
		imageUrl: string
		videoName: string
		videoDurationSeconds: number
		videoListingStatus: AllVideoListingStatuses
	}
	showSoldOutSticker?: boolean
}

function GeneralizedVideoThumbnail(props: Props) {
	const { thumbnailData, showSoldOutSticker = true } = props

	return (
		<div className="relative">
			<div className="aspect-w-16 aspect-h-9">
				<img
					src={thumbnailData.imageUrl}
					alt={thumbnailData.videoName}
					className="object-cover rounded-lg w-full h-full"
				/>
			</div>
			{showSoldOutSticker && (
				<SoldOutSticker videoListingStatus={thumbnailData.videoListingStatus} />
			)}
			<VideoDurationSticker videoDurationSeconds={thumbnailData.videoDurationSeconds} />
		</div>
	)
}

export default observer(GeneralizedVideoThumbnail)
