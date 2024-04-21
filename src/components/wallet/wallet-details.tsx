import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import TransferSolButton from "./transfer-sol/transfer-sol-button"
import RequestAirdropButton from "./request-airdrop/request-airdrop-button"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useConvertSolAmountDefaultCurrency from "../../hooks/solana/convert-sol-amount-to-default-currency"

function WalletDetails () {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const convertSolAmountToDefaultCurrency = useConvertSolAmountDefaultCurrency()

	const formattedTime = useMemo(() => {
		const lastRetrieved = solanaClass?.solPriceDetails?.lastRetrieved
		return lastRetrieved ? new Date(lastRetrieved).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true // Use AM/PM
		}) : "unknown"
	}, [solanaClass?.solPriceDetails?.lastRetrieved])

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<>
			<div className="flex flex-row">
				<div className="mr-4">
					<TransferSolButton />
				</div>
				<RequestAirdropButton />
			</div>
			<div className="bg-white shadow-lg rounded-md p-4 mt-4 grid grid-cols-1 grid-rows-1 border">
				Wallet Balance:
				{personalInfoClass.defaultCurrency === "usd" && (<> $</>)}
				{personalInfoClass.defaultCurrency === "sol" && (<> </>)}
				{_.round(convertSolAmountToDefaultCurrency(solanaClass.walletBalanceSol || 0) || 0, 2)}
				{personalInfoClass.defaultCurrency === "sol" && (<> Sol</>)}
				<br />
				{/* Wallet Balance: ${solanaClass.getWalletBalanceUSD} */}
				Last Solana price: ${solanaClass.solPriceDetails?.solPriceInUSD} {" "}
				(Last updated {formattedTime})
			</div>
		</>
	)
}

export default observer(WalletDetails)
