import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"

function LastSolanaPrice() {
	const solanaClass = useSolanaContext()

	const formattedTime = useMemo(() => {
		const lastRetrieved = solanaClass?.solPriceDetails?.lastRetrievedTime
		return lastRetrieved ? new Date(lastRetrieved).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true // Use AM/PM
		}) : "unknown"
	}, [solanaClass?.solPriceDetails?.lastRetrievedTime])

	if (_.isNull(solanaClass)) return null

	return (
		<div>
			<div className="text-lg font-bold">
				{_.isUndefined(solanaClass.solPriceDetails?.solPriceInUSD) ? (
					<>Loading...</>
				) : (
					<>${numberWithCommasFixed(solanaClass.solPriceDetails.solPriceInUSD, 2)}</>
				)}
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Last Solana price {" "} (
				<a
					href="https://www.coingecko.com/en/coins/solana"
					target="_blank"
					rel="noopener noreferrer"
					className="underline decoration-dotted"
				>
					Last updated {formattedTime}
				</a>)
			</div>
		</div>
	)
}

export default observer(LastSolanaPrice)
