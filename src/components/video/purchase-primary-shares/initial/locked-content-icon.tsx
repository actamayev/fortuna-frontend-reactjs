import _ from "lodash"
import { observer } from "mobx-react"
import { FaLock } from "react-icons/fa"
import Tooltip from "../../../tooltip"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: SingleVideoDataFromBackend
}

function LockedContentIcon(props: Props) {
	const { video } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const {
		isUserAbleToAccessVideo, uuid, valueNeededToAccessExclusiveContentUsd, listingSharePriceUsd,
		allowValueFromSameCreatorTokensForExclusiveContent, creatorUsername
	} = video

	if (
		_.isNull(positionsAndTransactionsClass) ||
		isUserAbleToAccessVideo === true ||
		_.isNull(valueNeededToAccessExclusiveContentUsd) ||
		_.isNull(allowValueFromSameCreatorTokensForExclusiveContent)
	) return null

	const sharesNeededToAccessExclusiveContent = Math.ceil(valueNeededToAccessExclusiveContentUsd / listingSharePriceUsd)

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(uuid)
	let sharesNeededToPurchase = sharesNeededToAccessExclusiveContent - numberSharesUserOwns

	let message = `Purchase ${sharesNeededToPurchase} more share${sharesNeededToPurchase === 1 ? "" : "s"} to unlock`
	if (allowValueFromSameCreatorTokensForExclusiveContent === false) {
		return (
			<div className="flex ml-2">
				<Tooltip
					message={message}
					width="250px"
					messageStart="center"
				>
					<FaLock />
				</Tooltip>
			</div>
		)
	}

	const sumOfValueOfTokensByThisCreatorUsd = positionsAndTransactionsClass.getSumOfValueOfTokensByThisCreator(creatorUsername)

	// This will never be negative because if the sumOfValueOfTokensByThisCreatorUsd exceeds valueNeededToAccessExclusiveContentUsd,
	// the videoUrl would have been fetched from the backend
	const valueLeftToPurchaseUsd = valueNeededToAccessExclusiveContentUsd - sumOfValueOfTokensByThisCreatorUsd
	sharesNeededToPurchase = Math.ceil(valueLeftToPurchaseUsd / listingSharePriceUsd)
	let width = "250px"
	if (sumOfValueOfTokensByThisCreatorUsd !== 0) {
		message = `${creatorUsername} has enabled cross-token value.
			Since you already own $${sumOfValueOfTokensByThisCreatorUsd}
			of ${creatorUsername}'s tokens from other videos, you only need
			to purchase ${sharesNeededToPurchase} more share${sharesNeededToPurchase === 1 ? "" : "s"} ($${valueLeftToPurchaseUsd})
			to unlock access (originally $${valueNeededToAccessExclusiveContentUsd})`
		width = "500px"
	}
	return (
		<div className="flex ml-2">
			<Tooltip
				message={message}
				width={width}
				messageStart="center"
			>
				<FaLock />
			</Tooltip>
		</div>
	)
}

export default observer(LockedContentIcon)
