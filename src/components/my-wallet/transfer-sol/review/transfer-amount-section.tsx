import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

function TransferAmountSection() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	return (
		<div>
			Sending {" "}
			{defaultCurrency === "usd" && (
				<>${_.round(solanaClass.transferSolDetails.transferAmount, 2)} to </>
			)}
			{defaultCurrency === "sol" && (
				<>{_.round(solanaClass.transferSolDetails.transferAmount, 4)} SOL to </>
			)}
			<span className="font-semibold">
				{solanaClass.transferSolDetails.transferOption === "username" && solanaClass.transferSolDetails.username}
				{solanaClass.transferSolDetails.transferOption === "publicKey" && solanaClass.transferSolDetails.publicKey}
			</span>
		</div>
	)
}

export default observer(TransferAmountSection)
