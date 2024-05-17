import _ from "lodash"
import { observer } from "mobx-react"
import FeeSection from "./fee-section"
import ConfirmTransactionButton from "./confirm-transaction-button"
import ReviewTransferBackButton from "./review-transfer-back-button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<ReviewTransferBackButton />
				<div className="text-center flex-1">
					Review Transfer
				</div>
			</div>
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
			Fee: <FeeSection />
			<ConfirmTransactionButton />
		</>
	)
}

export default observer(ReviewTransferInfo)
