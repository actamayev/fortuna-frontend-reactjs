import FeeSection from "./fee-section"
import TransferAmountSection from "./transfer-amount-section"
import ConfirmTransferButton from "./confirm-transfer-button"
import ReviewTransferBackButton from "./review-transfer-back-button"

export default function ReviewTransferInfo() {
	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<div className="absolute left-1">
					<ReviewTransferBackButton />
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
