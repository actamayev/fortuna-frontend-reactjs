import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function TransferAmountSection() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<div>
			Sending {" "}
			{personalInfoClass.defaultCurrency === "usd" && (
				<> ${_.round(solanaClass.transferSolDetails.transferAmount, 2)} to </>
			)}
			{personalInfoClass.defaultCurrency === "sol" && (
				<> {_.round(solanaClass.transferSolDetails.transferAmount, 4)} SOL to </>
			)}
			<span className="font-semibold">
				{solanaClass.transferSolDetails.transferOption === "username" && solanaClass.transferSolDetails.username}
				{solanaClass.transferSolDetails.transferOption === "publicKey" && solanaClass.transferSolDetails.publicKey}
			</span>
		</div>
	)
}

export default observer(TransferAmountSection)
