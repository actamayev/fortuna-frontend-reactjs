import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import numberWithCommas from "../../utils/number-with-commas"

function NewTokenSummary() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	// eslint-disable-next-line max-len
	const creatorNumberShares = _.floor(solanaClass.newSplDetails.creatorOwnershipPercentage * solanaClass.newSplDetails.numberOfShares * 0.01)
	const fortunaShares = _.ceil(solanaClass.newSplDetails.numberOfShares * 0.01)
	const fanShares = solanaClass.newSplDetails.numberOfShares - creatorNumberShares - fortunaShares

	const { listingSharePriceUsd, numberOfShares } = solanaClass.newSplDetails

	return (
		<div className = "bg-white border shadow rounded-lg w-full dark:border-b-2 p-2">
			<h1 className = "flex text-xl text-center font-bold leading-none tracking-tight text-black mb-3">
				Token Summary
			</h1>
			<h2 className = "flex text-md text-center font-semibold leading-none tracking-tight text-black">
				Share Distribution
			</h2>
			<div>
				You will receive: {creatorNumberShares} {" "} Shares
			</div>
			<div>
				Fortuna fee (1%): {fortunaShares} Share{fortunaShares === 1 ? (<></>) : <>s</>}
			</div>
			<div>
				Available to fans: {fanShares} Shares
			</div>
			<h2 className = "flex text-md text-center font-semibold leading-none tracking-tight text-black mt-3">
				Token Value information
			</h2>
			<div>
				Implied Video Value: ${numberWithCommas((listingSharePriceUsd * numberOfShares))}
			</div>
			<div>Pegging to USD</div>
		</div>
	)
}

export default observer(NewTokenSummary)
