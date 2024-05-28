import _ from "lodash"
import { observer } from "mobx-react"
import InstantAccessCost from "./instant-access-cost"
import ReviewInstantAccessButton from "./review-instant-access-button"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: VideoDataWithVideoUrl
	orNeeded: boolean
}

function InitialInstantAccessInfo(props: Props) {
	const { video, orNeeded } = props
	const exchangeClass = useExchangeContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (
		_.isUndefined(video) ||
		video.isSplExclusive === false ||
		_.isNull(positionsAndTransactionsClass) ||
		_.isNull(exchangeClass) ||
		exchangeClass.instantAccessToExclusiveContentStage !== "initial"
	) return null

	if (positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(video.uuid) === true) {
		return (
			<div className="w-full">
				<div className="flex items-center w-full">
					<hr className="flex-grow border-t border-gray-300" />
				</div>
				<div className="flex items-center w-full">
					<span>You have already purchased exclusive access to this video</span>
				</div>
			</div>
		)
	}

	if (!_.isUndefined(video.videoUrl)) {
		const sharesOwned = positionsAndTransactionsClass.getNumberSharesOwnedByUUID(video.uuid)
		return (
			<div className="w-full">
				<div className="flex items-center w-full">
					<hr className="flex-grow border-t border-gray-300" />
				</div>
				<div className="flex items-center w-full">
					<span>You have access to this exclusive video through share ownership</span>
				</div>
				Shares owned: {sharesOwned}
			</div>
		)
	}

	return (
		<>
			<div className="flex items-center w-full">
				<hr className="flex-grow border-t border-gray-300" />
				{orNeeded && <span className="px-4 text-gray-500">or</span> }
				<hr className="flex-grow border-t border-gray-300" />
			</div>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Instant Access
			</div>
			<InstantAccessCost video={video}/>
			<div className="mt-3 mb-3 flex justify-center">
				<ReviewInstantAccessButton video={video}/>
			</div>
		</>
	)
}

export default observer(InitialInstantAccessInfo)
