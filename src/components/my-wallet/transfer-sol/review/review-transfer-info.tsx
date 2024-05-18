import FeeSection from "./fee-section"
import TransferAmountSection from "./transfer-amount-section"
import ConfirmTransferButton from "./confirm-transfer-button"
import ReviewTransferBackButton from "./review-transfer-back-button"

export default function ReviewTransferInfo() {
	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<ReviewTransferBackButton />
				<div className="text-center flex-1">
					Review Transfer
				</div>
			</div>
			<TransferAmountSection />
			Fee: <FeeSection />
			<ConfirmTransferButton />
		</>
	)
}
