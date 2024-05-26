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
	if (_.isNull(positionsAndTransactionsClass) || !_.isUndefined(videoUrl)) return null

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(uuid)

	if (_.isNull(valueNeededToAccessExclusiveContentUsd) || _.isNull(allowValueFromSameCreatorTokensForExclusiveContent)) return null

	const sharesNeededToAccessExclusiveContent = Math.ceil(valueNeededToAccessExclusiveContentUsd / listingSharePriceUsd)

	let message = `Purchase ${sharesNeededToAccessExclusiveContent - numberSharesUserOwns} more shares to unlock.`
	if (allowValueFromSameCreatorTokensForExclusiveContent === false) {
		return (
			<Tooltip message={message} width="250px">
				<FaLock />
			</Tooltip>
		)
	}

	const sumOfValueOfTokensByThisCreatorUsd = positionsAndTransactionsClass.getSumOfValueOfTokensByThisCreator(creatorUsername)

	const valueLeftToPurchaseUsd = valueNeededToAccessExclusiveContentUsd - sumOfValueOfTokensByThisCreatorUsd
	const sharesNeededToPurchase = Math.ceil(valueLeftToPurchaseUsd / listingSharePriceUsd)
	if (sumOfValueOfTokensByThisCreatorUsd !== 0) {
		message = `${creatorUsername} has enabled cross-token value.
			Since you already own $${sumOfValueOfTokensByThisCreatorUsd}
			of ${creatorUsername}'s tokens from other videos, you only need
			to purchase ${sharesNeededToPurchase} more shares ($${valueLeftToPurchaseUsd})
			to unlock access (originally $${valueNeededToAccessExclusiveContentUsd})`
	}
	return (
		<Tooltip
			message={message}
			width={sumOfValueOfTokensByThisCreatorUsd === 0 ? "250px" : "350px"}
		>
			<FaLock />
		</Tooltip>
	)
}

export default observer(LockedContentIcon)
