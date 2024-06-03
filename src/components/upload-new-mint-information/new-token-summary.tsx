import _ from "lodash"
import { observer } from "mobx-react"
import Tooltip from "../tooltip"
import ImpliedVideoValue from "./implied-video-value"
import { useSolanaContext } from "../../contexts/solana-context"

function NewTokenSummary() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	// eslint-disable-next-line max-len
	const creatorNumberShares = _.floor(solanaClass.newSplDetails.creatorOwnershipPercentage * solanaClass.newSplDetails.numberOfShares * 0.01)
	const fortunaShares = _.ceil(solanaClass.newSplDetails.numberOfShares * 0.01)
	const fanShares = solanaClass.newSplDetails.numberOfShares - creatorNumberShares - fortunaShares

	return (
		<div className = "bg-white dark:bg-zinc-800 border shadow rounded-lg w-full dark:border-b-2 p-2">
			<h1 className = "flex text-xl text-center font-semibold leading-none tracking-tight mb-3">
				Token Summary
			</h1>
			<h2 className = "flex text-md text-center font-semibold leading-none tracking-tight">
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
			<h2 className = "flex text-md text-center font-semibold leading-none tracking-tight mt-3">
				Token Value Information
			</h2>
			Implied Video Value: <ImpliedVideoValue />
			<div className="flex">
				Pegging to USD
				<div className="ml-2">
					<Tooltip
						message="The USD value of this token will not change with Solana's price fluctuations"
						width="275px"
						messageStart="center"
					>
					ℹ️
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default observer(NewTokenSummary)
