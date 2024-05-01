import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"

function ContentShareBreakdown() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	// eslint-disable-next-line max-len
	const creatorNumberShares = _.floor(solanaClass.newSplDetails.creatorOwnershipPercentage * solanaClass.newSplDetails.numberOfShares * 0.01)
	const fortunaShares = _.ceil(solanaClass.newSplDetails.numberOfShares * 0.01)
	const fanShares = solanaClass.newSplDetails.numberOfShares - creatorNumberShares - fortunaShares

	return (
		<div className = "bg-white border shadow rounded-lg w-full dark:border-b-2 p-2">
			<h1 className = "flex text-xl text-center font-bold leading-none tracking-tight text-black">
				Share Breakdown
			</h1>
			<div>
				You will receive {" "} {creatorNumberShares} {" "} Shares
			</div>
			<div>
				Fortuna fee: {fortunaShares} Share{fortunaShares === 1 ? (<></>) : <>s</>}
			</div>
			<div>
				Shares Available to fans: {fanShares} Shares
			</div>
			<div>
				Pegging to {" "}
				{_.upperCase(solanaClass.newSplDetails.listingDefaultCurrency)}
			</div>
		</div>
	)
}

export default observer(ContentShareBreakdown)
