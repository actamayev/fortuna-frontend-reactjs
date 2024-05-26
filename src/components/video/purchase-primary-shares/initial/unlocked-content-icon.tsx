import _ from "lodash"
import { observer } from "mobx-react"
import { FaUnlock } from "react-icons/fa"
import Tooltip from "../../../tooltip"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function UnlockedContentIcon(props: Props) {
	const { video } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const { videoUrl, uuid, listingSharePriceUsd, valueNeededToAccessExclusiveContentUsd,
		allowValueFromSameCreatorTokensForExclusiveContent, creatorUsername } = video

	if (
		_.isNull(positionsAndTransactionsClass) ||
		_.isUndefined(videoUrl) ||
		_.isNull(valueNeededToAccessExclusiveContentUsd) ||
		_.isNull(allowValueFromSameCreatorTokensForExclusiveContent)
	) return null

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(uuid)
	const valueOfSharesOwnedUsd = numberSharesUserOwns * listingSharePriceUsd

	const doesUserHaveInstantExclusiveAccess = positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(uuid)

	if (allowValueFromSameCreatorTokensForExclusiveContent === false) {
		let message
		if (doesUserHaveInstantExclusiveAccess === true) {
			message = "You purchased instant access to this exclusive video"
		} else {
			message = `You own $${valueOfSharesOwnedUsd} of this token, which is greater than or equal to 
			the value necessary to access this exclusive content ($${valueNeededToAccessExclusiveContentUsd})`
		}
		return (
			<Tooltip
				message={message}
				width="250px"
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	let message
	if (doesUserHaveInstantExclusiveAccess === true) {
		message = "You purchased instant access to this exclusive video"
	} else if (valueOfSharesOwnedUsd < valueNeededToAccessExclusiveContentUsd) {
		message = `${creatorUsername} has enabled cross-token value.
			The total value of your tokens from this creator exceeds the required value for exclusive content access.
			Even though you don't have $${valueNeededToAccessExclusiveContentUsd}
			of this token, you own other tokens by this creator`
	} else {
		message = `${creatorUsername} has enabled cross-token value.
		The total value of your tokens from this creator exceeds the required value for exclusive content access.`
	}

	return (
		<Tooltip
			message={message}
			width="700px"
		>
			<FaUnlock />
		</Tooltip>
	)
}

export default observer(UnlockedContentIcon)
