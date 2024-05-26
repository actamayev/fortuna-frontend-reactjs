import _ from "lodash"
import { observer } from "mobx-react"
import InstantAccessCost from "./instant-access-cost"
import ReviewInstantAccessButton from "./review-instant-access-button"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataWithVideoUrl
}

function InitialInstantAccessInfo(props: Props) {
	const { video } = props
	const exchangeClass = useExchangeContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (
		_.isUndefined(video) ||
		video.isSplExclusive === false ||
		_.isNull(positionsAndTransactionsClass) ||
		positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(video.uuid) === true ||
		_.isNull(exchangeClass) ||
		exchangeClass.instantAccessToExclusiveContentStage !== "initial"
	) return null

	return (
		<>
			<div className="flex items-center w-full">
				<hr className="flex-grow border-t border-gray-300" />
				<span className="px-4 text-gray-500">or</span>
				<hr className="flex-grow border-t border-gray-300" />
			</div>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Instant Access
			</div>
			<InstantAccessCost video={video}/>
			<ReviewInstantAccessButton video={video}/>
		</>
	)
}

export default observer(InitialInstantAccessInfo)
