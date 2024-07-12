import { observer } from "mobx-react"

interface Props {
	videoListingStatus: AllVideoListingStatuses
	backgroundColor?: string
}

function SoldOutSticker(props: Props) {
	const { videoListingStatus, backgroundColor = "bg-red-600" } = props

	if (videoListingStatus !== "SOLDOUT") return null

	return (
		<div className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded ${backgroundColor}`}>
			Sold Out
		</div>
	)
}

export default observer(SoldOutSticker)
