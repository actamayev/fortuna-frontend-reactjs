import _ from "lodash"
import { observer } from "mobx-react"
import Tooltip from "../../../tooltip"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function HowIsUserAbleToAccessExclusiveContent(props: Props) {
	const { video } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (video.isSplExclusive === false ||
		_.isUndefined(video.videoUrl) ||
		_.isNull(video.valueNeededToAccessExclusiveContentUsd) ||
		_.isNull(positionsAndTransactionsClass)
	) return null

	const sharesNeededToAccessExclusiveContent = video.valueNeededToAccessExclusiveContentUsd / video.listingSharePriceUsd
	const numberSharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(video.uuid)

	if (numberSharesOwned <= sharesNeededToAccessExclusiveContent) return null

	return (
		<div className="flex">
			<span className="text-sm text-gray-800">
				How am I able to view this video?
			</span>
			<Tooltip
				message = {
					`${video.creatorUsername} has enabled cross-video token value for this video.
					Even though you don't have the tokens necessary to access this video,
					you hold enough value from other videos to access this video.`
				}
				width="250px"
			/>
		</div>
	)
}

export default observer(HowIsUserAbleToAccessExclusiveContent)
