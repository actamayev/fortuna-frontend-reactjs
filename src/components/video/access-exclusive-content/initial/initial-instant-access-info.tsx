import _ from "lodash"
import { observer } from "mobx-react"
import AccessPrice from "./access-price"
import ReviewInstantAccessButton from "./review-instant-access-button"
import { useMarketContext } from "../../../../contexts/market-context"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	video: SingleVideoDataFromBackend
	orNeeded: boolean
}

function InitialInstantAccessInfo(props: Props) {
	const { video, orNeeded } = props
	const marketClass = useMarketContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	if (
		_.isUndefined(video) ||
		video.isVideoExclusive === false ||
		_.isNull(positionsAndTransactionsClass) ||
		_.isNull(marketClass) ||
		marketClass.instantAccessToExclusiveContentStage !== "initial"
	) return null

	if (positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(video.uuid) === true) {
		return (
			<div className="w-full">
				<div className="flex items-center w-full">
					<hr className="flex-grow border-t border-zinc-300" />
				</div>
				<div className="flex items-center w-full">
					<span>You have already purchased access to this exclusive video</span>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="flex items-center w-full">
				<hr className="flex-grow border-t border-zinc-300" />
				{orNeeded && <span className="px-4 text-zinc-500">or</span> }
				<hr className="flex-grow border-t border-zinc-300" />
			</div>
			<div className="text-center font-semibold flex justify-center items-center text-xl">
				Instant Access
			</div>
			<AccessPrice video={video}/>
			<div className="mt-3 mb-3 flex justify-center">
				<ReviewInstantAccessButton video={video}/>
			</div>
		</>
	)
}

export default observer(InitialInstantAccessInfo)
