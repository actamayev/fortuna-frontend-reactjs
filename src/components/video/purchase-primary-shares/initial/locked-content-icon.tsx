import _ from "lodash"
import { observer } from "mobx-react"
import { FaLock } from "react-icons/fa"
import Tooltip from "../../../tooltip"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function LockedContentIcon(props: Props) {
	const { video } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (_.isNull(positionsAndTransactionsClass) || !_.isUndefined(video.videoUrl)) return null

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(video.uuid)

	const valueNeededToAccessContentUsd = video.valueNeededToAccessExclusiveContentUsd
	if (_.isNull(valueNeededToAccessContentUsd)) return null

	const sharesNeededToAccessExclusiveContent = valueNeededToAccessContentUsd / video.listingSharePriceUsd

	if (video.allowValueFromSameCreatorTokensForExclusiveContent === false) {
		return (
			<Tooltip
				message={`Purchase ${sharesNeededToAccessExclusiveContent - numberSharesUserOwns} more shares to unlock.`}
				width="200px"
			>
				<FaLock />
			</Tooltip>
		)
	}

	const sumOfValueOfTokensByThisCreatorUsd = positionsAndTransactionsClass.getSumOfValueOfTokensByThisCreator(video.creatorUsername)

	const valueLeftToPurchaseUsd = valueNeededToAccessContentUsd - sumOfValueOfTokensByThisCreatorUsd
	const sharesNeededToPurchase = Math.ceil(valueLeftToPurchaseUsd / video.listingSharePriceUsd)
	return (
		<Tooltip
			message={
				`${video.creatorUsername} has enabled cross-token value.
				Since you already own $${sumOfValueOfTokensByThisCreatorUsd}
				of ${video.creatorUsername}'s tokens from other videos, you only need
				to purchase ${valueLeftToPurchaseUsd} more shares (${sharesNeededToPurchase}) to unlock access.`
			}
		>
			<FaLock />
		</Tooltip>
	)
}

export default observer(LockedContentIcon)
