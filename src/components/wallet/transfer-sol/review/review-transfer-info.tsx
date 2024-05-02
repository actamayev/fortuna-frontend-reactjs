import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import FeeSection from "./fee-section"
import ConfirmTransactionButton from "./confirm-transaction-button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<Button
					title="<"
					colorClass="bg-blue-200"
					hoverClass="hover:bg-blue-300"
					onClick={() => solanaClass.updateTransferSolDetails("transferStage", "initial")}
					className="font-semibold"
				/>
				<div className="text-center flex-1">
					Review Transfer
				</div>
			</div>
			<div>
				Sending
				{personalInfoClass.defaultCurrency === "usd" && (
					<> ${_.round(solanaClass.transferSolDetails.transferAmount, 2)} to </>
				)}
				{personalInfoClass.defaultCurrency === "sol" && (
					<> {_.round(solanaClass.transferSolDetails.transferAmount, 4)} SOL to </>
				)}

				{solanaClass.transferSolDetails.transferOption === "username" && solanaClass.transferSolDetails.username}
				{solanaClass.transferSolDetails.transferOption === "publicKey" && solanaClass.transferSolDetails.publicKey}
			</div>
			Fee: <FeeSection />
			<ConfirmTransactionButton />
		</>
	)
}

export default observer(ReviewTransferInfo)
