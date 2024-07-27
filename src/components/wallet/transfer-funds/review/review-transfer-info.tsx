import { useCallback } from "react"
import { observer } from "mobx-react"
import FeeSection from "./fee-section"
import BackButton from "../../../buttons/back-button"
import TransferAmountSection from "./transfer-amount-section"
import ConfirmTransferButton from "./confirm-transfer-button"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()

	const updateMoneyTransferDetails = useCallback(() => {
		solanaClass.updateMoneyTransferDetails("transferStage", "initial")
	}, [solanaClass])

	return (
		<>
			<div className="relative flex flex-row justify-between items-center font-semibold w-full mb-2">
				<div className="absolute left-0">
					<BackButton onClick={updateMoneyTransferDetails} />
				</div>
				<div className="text-center w-full inset-x-0 mx-auto text-xl">
					Review Transfer
				</div>
			</div>
			<TransferAmountSection />
			Fee: <FeeSection />
			<ConfirmTransferButton />
		</>
	)
}

export default observer(ReviewTransferInfo)
