import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import WalletBalance from "./wallet-balance"
import { useSolanaContext } from "../../contexts/solana-context"

function WalletBalanceAndLastUpdate() {
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
			<div>
				Wallet Balance: <WalletBalance />
			</div>
			<div>
				Last Solana price: {" "}
				{_.isUndefined(solanaClass.solPriceDetails?.solPriceInUSD) ? (<>Loading...</>) : (
					<>
						${_.round(solanaClass.solPriceDetails.solPriceInUSD || 0, 2)} {" "}
						(Last updated {formattedTime})
					</>
				)}
			</div>
		</div>
	)
}

export default observer(WalletBalanceAndLastUpdate)
