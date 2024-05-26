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

	if (_.isNull(positionsAndTransactionsClass) || _.isUndefined(video.videoUrl)) return null

	const numberSharesUserOwns = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(video.uuid)
	const valueOfSharesOwnedUsd = numberSharesUserOwns * video.listingSharePriceUsd

	const { valueNeededToAccessExclusiveContentUsd, allowValueFromSameCreatorTokensForExclusiveContent, creatorUsername } = video

	if (_.isNull(allowValueFromSameCreatorTokensForExclusiveContent)) return null

	if (allowValueFromSameCreatorTokensForExclusiveContent === false) {
		return (
			<Tooltip
				message={
					`You own $${valueOfSharesOwnedUsd} of this token, which is greater than or equal to 
					the value necessary to access this exclusive content ($${valueNeededToAccessExclusiveContentUsd})`
				}
				width="250px"
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	let text
	if (valueNeededToAccessExclusiveContentUsd) {
		if (valueOfSharesOwnedUsd < valueNeededToAccessExclusiveContentUsd) {
			text = `Even though you don't have $${valueNeededToAccessExclusiveContentUsd}
				of this token, you own other tokens by this creator`
		}
	}
	return (
		<Tooltip
			message={
				`${creatorUsername} has enabled cross-token value.
				The total value of your tokens from this creator exceeds the required value for exclusive content access. ${text}`
			}
			width="700px"
		>
			<FaUnlock />
		</Tooltip>
	)
}

export default observer(UnlockedContentIcon)
