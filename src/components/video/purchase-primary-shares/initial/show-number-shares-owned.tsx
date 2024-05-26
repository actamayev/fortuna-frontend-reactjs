import _ from "lodash"
import { observer } from "mobx-react"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function ShowNumberSharesOwned(props: Props) {
	const { video } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (_.isNull(positionsAndTransactionsClass)) return null

	const numberSharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(video.uuid)

	return (
		<>
			Number Shares Owned: {numberSharesOwned}
		</>
	)
}

export default observer(ShowNumberSharesOwned)
