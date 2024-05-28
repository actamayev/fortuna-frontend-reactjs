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

	const {
		videoUrl, uuid, valueNeededToAccessExclusiveContentUsd, listingSharePriceUsd,
		allowValueFromSameCreatorTokensForExclusiveContent, creatorUsername
	} = video

	if (
		_.isNull(positionsAndTransactionsClass) ||
		!_.isUndefined(videoUrl) ||
		_.isNull(valueNeededToAccessExclusiveContentUsd) ||
		_.isNull(allowValueFromSameCreatorTokensForExclusiveContent)
	) return null

	const sharesNeededToAccessExclusiveContent = Math.ceil(valueNeededToAccessExclusiveContentUsd / listingSharePriceUsd)

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(uuid)

	let message = `Purchase ${sharesNeededToAccessExclusiveContent - numberSharesUserOwns} more shares to unlock`
	if (allowValueFromSameCreatorTokensForExclusiveContent === false) {
		return (
			<Tooltip message={message} width="250px">
				<FaLock />
			</Tooltip>
		)
	}

	const sumOfValueOfTokensByThisCreatorUsd = positionsAndTransactionsClass.getSumOfValueOfTokensByThisCreator(creatorUsername)

	// This will never be negative because if the sumOfValueOfTokensByThisCreatorUsd exceeds valueNeededToAccessExclusiveContentUsd,
	// the videoUrl would have been fetched from the backend
	const valueLeftToPurchaseUsd = valueNeededToAccessExclusiveContentUsd - sumOfValueOfTokensByThisCreatorUsd
	const sharesNeededToPurchase = Math.ceil(valueLeftToPurchaseUsd / listingSharePriceUsd)
	let width = "250px"
	if (sumOfValueOfTokensByThisCreatorUsd !== 0) {
		message = `${creatorUsername} has enabled cross-token value.
			Since you already own $${sumOfValueOfTokensByThisCreatorUsd}
			of ${creatorUsername}'s tokens from other videos, you only need
			to purchase ${sharesNeededToPurchase} more shares ($${valueLeftToPurchaseUsd})
			to unlock access (originally $${valueNeededToAccessExclusiveContentUsd})`
		width = "500px"
	}
	return (
		<Tooltip
			message={message}
			width={width}
		>
			<FaLock />
		</Tooltip>
	)
}

export default observer(LockedContentIcon)
