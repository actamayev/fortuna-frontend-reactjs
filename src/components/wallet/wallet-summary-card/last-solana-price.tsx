import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import { SuperMoneyStyleDollars } from "../../usd-or-sol/super-money-style"

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

	const solPriceUsd = useMemo(() => {
		if (_.isNil(solanaClass?.solPriceDetails)) return { dollars: "0", cents: "0" }
		return numberWithCommasFixed(solanaClass.solPriceDetails.solPriceInUSD, 2)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass?.solPriceDetails?.solPriceInUSD])

	if (_.isNull(solanaClass)) return null


	return (
		<div>
			<div className="text-lg font-bold">
				{_.isUndefined(solanaClass.solPriceDetails?.solPriceInUSD) ? (
					<>Loading...</>
				) : (
					<SuperMoneyStyleDollars
						dollars={solPriceUsd.dollars}
						cents={solPriceUsd.cents}
					/>
				)}
			</div>
			<div className="text-zinc-500 dark:text-zinc-400 text-sm">
				Last Solana price&nbsp;(
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
