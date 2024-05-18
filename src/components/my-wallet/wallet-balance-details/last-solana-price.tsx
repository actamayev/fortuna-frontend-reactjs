import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"

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
			Last Solana price: {" "}
			{_.isUndefined(solanaClass.solPriceDetails?.solPriceInUSD) ? (<>Loading...</>) : (
				<>
					${(solanaClass.solPriceDetails.solPriceInUSD).toFixed(2)} {" "}
					(Last updated {formattedTime})
				</>
			)}
		</div>
	)
}

export default observer(LastSolanaPrice)
