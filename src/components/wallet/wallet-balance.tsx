import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

// eslint-disable-next-line complexity
function WalletBalance() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	const formattedTime = useMemo(() => {
		const lastRetrieved = solanaClass?.solPriceDetails?.lastRetrievedTime
		return lastRetrieved ? new Date(lastRetrieved).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true // Use AM/PM
		}) : "unknown"
	}, [solanaClass?.solPriceDetails?.lastRetrievedTime])

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<div>
			<div>
				Wallet Balance:
				{_.isNull(solanaClass.walletBalanceSol) ? (<> Loading...</>) : (
					<>
						{personalInfoClass.defaultCurrency === "usd" && (<> ${_.round(solanaClass.walletBalanceUSD.get(), 2)}</>)}
						{personalInfoClass.defaultCurrency === "sol" && (<> {_.round(solanaClass.walletBalanceSol || 0, 4)} SOL</>)}
					</>
				)}
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

export default observer(WalletBalance)
