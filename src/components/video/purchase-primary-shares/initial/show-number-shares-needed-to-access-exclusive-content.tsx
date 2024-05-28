import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	video: VideoDataWithVideoUrl
}

function ShowNumberSharesNeededToAccessExclusiveContent(props: Props) {
	const { video } = props

	if (
		video.isSplExclusive === false ||
		!_.isUndefined(video.videoUrl) ||
		_.isNull(video.valueNeededToAccessExclusiveContentUsd)
	) return null

	const sharesNeededToAccessExclusiveContent = Math.ceil(video.valueNeededToAccessExclusiveContentUsd / video.listingSharePriceUsd)

	return (
		<>
			Purchase {" "}
			<span className="font-bold">
				{sharesNeededToAccessExclusiveContent}
			</span> {" "}
			more shares to unlock
		</>
	)
}

export default observer(ShowNumberSharesNeededToAccessExclusiveContent)
