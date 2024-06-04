import _ from "lodash"
import { observer } from "mobx-react"

interface Props {
	video: SingleVideoDataFromBackend
}

function ShowNumberSharesNeededToAccessExclusiveContent(props: Props) {
	const { video } = props

	if (
		video.isSplExclusive === false ||
		video.isUserAbleToAccessVideo === true ||
		_.isNull(video.valueNeededToAccessExclusiveContentUsd)
	) return null

	const sharesNeededToAccessExclusiveContent = Math.ceil(video.valueNeededToAccessExclusiveContentUsd / video.listingSharePriceUsd)

	return (
		<>
			Purchase {" "}
			<span className="font-semibold">
				{sharesNeededToAccessExclusiveContent}
			</span> {" "}
			more share{sharesNeededToAccessExclusiveContent === 1 ? "" : "s"} to unlock
		</>
	)
}

export default observer(ShowNumberSharesNeededToAccessExclusiveContent)
