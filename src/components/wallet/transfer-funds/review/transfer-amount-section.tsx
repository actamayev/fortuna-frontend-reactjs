import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import ShowProvidedUsdOrSolPrice from "../../../usd-or-sol/show-provided-usd-or-sol-price"

function TransferAmountSection() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div>
			Sending&nbsp;
			<ShowProvidedUsdOrSolPrice
				roundOrFixed="round"
				solPriceToDisplay={solanaClass.moneyTransferDetails.transferAmount}
				usdPriceToDisplay={solanaClass.moneyTransferDetails.transferAmount}
			/>{" "}
			to&nbsp;
			<span className="font-semibold break-all">
				{solanaClass.moneyTransferDetails.transferOption === "username" && solanaClass.moneyTransferDetails.username}
				{solanaClass.moneyTransferDetails.transferOption === "publicKey" && solanaClass.moneyTransferDetails.publicKey}
			</span>
		</div>
	)
}

export default observer(TransferAmountSection)
