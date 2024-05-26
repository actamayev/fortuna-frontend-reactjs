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

	const valueNeededToAccessContentUsd = video.valueNeededToAccessExclusiveContentUsd

	if (video.allowValueFromSameCreatorTokensForExclusiveContent === false) {
		return (
			<Tooltip
				message={
					`You own $${valueOfSharesOwnedUsd} of this token, which is more than $${valueNeededToAccessContentUsd}
					(value necessary to access this exclusive content)`
				}
				width="250px"
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	let text
	if (valueNeededToAccessContentUsd) {
		if (valueOfSharesOwnedUsd < valueNeededToAccessContentUsd) {
			text = `Even though you don't have $${valueNeededToAccessContentUsd} of this token, you own other tokens by this creator`
		}
	}
	return (
		<Tooltip
			message={
				`${video.creatorUsername} has enabled cross-token value.
				The total value of your tokens from this creator exceeds the required value for exclusive content access. ${text}`
			}
			width="700px"
		>
			<FaUnlock />
		</Tooltip>
	)
}

export default observer(UnlockedContentIcon)
