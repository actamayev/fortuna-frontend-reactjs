import _ from "lodash"
import { FaLock, FaUnlock } from "react-icons/fa"
import Tooltip from "../tooltip"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataLessVideoUrl
	index: number
}

export default function ShowHomeVideoLockStatus(props: Props) {
	const { video, index } = props
	console.log(video.splName, index)
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const { isUserAbleToAccessVideo, valueNeededToAccessExclusiveContentUsd, listingSharePriceUsd, uuid } = video

	const isRightMostVideo = ((index  + 1) % 4) === 0
	if (isUserAbleToAccessVideo === true) {
		return (
			<Tooltip
				message="You have access to this video"
				width="215px"
				messageStart={isRightMostVideo ? "left" : "center"}
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	if (_.isNull(positionsAndTransactionsClass) || _.isNull(valueNeededToAccessExclusiveContentUsd)) return null

	const sharesNeededToAccessExclusiveContent = Math.ceil(valueNeededToAccessExclusiveContentUsd / listingSharePriceUsd)

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(uuid)
	const sharesNeededToPurchase = sharesNeededToAccessExclusiveContent - numberSharesUserOwns

	const message = `You do not have access to this video Purchase ${sharesNeededToPurchase}
		more share${sharesNeededToPurchase === 1 ? "" : "s"} to unlock`

	return (
		<Tooltip
			message={message}
			width="250px"
			messageStart={isRightMostVideo ? "left" : "center"}
		>
			<FaLock />
		</Tooltip>
	)
}
