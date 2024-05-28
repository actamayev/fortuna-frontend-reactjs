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
		allowValueFromSameCreatorTokensForExclusiveContent, creatorUsername, isSplExclusive } = video

	if (isSplExclusive === false) {
		return (
			<Tooltip
				message="This video is not exclusive"
				width="200px"
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	if (_.isNull(positionsAndTransactionsClass) || _.isUndefined(videoUrl)) return null

	const doesUserHaveInstantExclusiveAccess = positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(uuid)

	if (doesUserHaveInstantExclusiveAccess === true) {
		return (
			<Tooltip
				message="You purchased instant access to this exclusive video"
				width="225px"
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	if (_.isNull(valueNeededToAccessExclusiveContentUsd) || _.isNull(allowValueFromSameCreatorTokensForExclusiveContent)) return null

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(uuid)
	const valueOfSharesOwnedUsd = numberSharesUserOwns * listingSharePriceUsd

	let message
	let width = "500px"
	if (allowValueFromSameCreatorTokensForExclusiveContent === false) {
		message = `You own $${valueOfSharesOwnedUsd} of this token, which is greater than or equal to 
			the value necessary to access this exclusive video ($${valueNeededToAccessExclusiveContentUsd})`
		return (
			<Tooltip
				message={message}
				width={width}
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	if (valueOfSharesOwnedUsd >= valueNeededToAccessExclusiveContentUsd) {
		message = `${creatorUsername} has enabled cross-token value.
			The total value of your tokens from this creator exceeds the required value for exclusive video access`
	} else {
		message = `${creatorUsername} has enabled cross-token value.
			The total value of your tokens from this creator exceeds the required value for exclusive video access.
			Even though you don't hold $${valueNeededToAccessExclusiveContentUsd} of this token, you own other tokens by this creator`
		width = "700px"
	}

	return (
		<Tooltip
			message={message}
			width={width}
		>
			<FaUnlock />
		</Tooltip>
	)
}

export default observer(UnlockedContentIcon)
