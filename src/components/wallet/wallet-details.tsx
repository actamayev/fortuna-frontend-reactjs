import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import TransferSolButton from "./transfer-sol/transfer-sol-button"

function WalletDetails () {
	const solanaClass = useSolanaContext()

	const formattedTime = useMemo(() => {
		const lastRetrieved = solanaClass?.solPriceDetails?.lastRetrieved
		return lastRetrieved ? new Date(lastRetrieved).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true // Use AM/PM
		}) : "unknown"
	}, [solanaClass?.solPriceDetails?.lastRetrieved])

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<TransferSolButton />
			<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1 border">
				Wallet Balance: {solanaClass.walletBalanceSol} Sol
				<br />
				{/* Wallet Balance: ${solanaClass.getWalletBalanceUSD} */}
				Last Solana price: ${solanaClass.solPriceDetails?.solPriceInUSD}
				<br />
				(Last updated {formattedTime})
			</div>
		</>
	)
}

export default observer(WalletDetails)
