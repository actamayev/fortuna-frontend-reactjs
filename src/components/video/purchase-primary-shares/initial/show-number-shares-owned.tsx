import _ from "lodash"
import { observer } from "mobx-react"
import LockedContentIcon from "./locked-content-icon"
import UnlockedContentIcon from "./unlocked-content-icon"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: SingleVideoDataFromBackend
}

function ShowNumberSharesOwned(props: Props) {
	const { video } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (_.isNull(positionsAndTransactionsClass)) return null

	const numberSharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(video.uuid)

	return (
		<div className="flex">
			Shares Owned: {numberSharesOwned}
			<UnlockedContentIcon video={video} />
			<LockedContentIcon video={video} />
		</div>
	)
}

export default observer(ShowNumberSharesOwned)
