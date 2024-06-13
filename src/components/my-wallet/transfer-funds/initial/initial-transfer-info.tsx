import SelectTransferAmount from "./select-transfer-amount"
import ReviewTransferButton from "./review-transfer-button"
import SelectTransferOption from "./select-transfer-option"
import TransferFundsByOptions from "./transfer-funds-by-options"

export default function InitialTransferInfo() {
	return (
		<>
			<div className="text-center font-semibold text-lg">Transfer Funds</div>
			<SelectTransferOption />

			<TransferFundsByOptions />

			<SelectTransferAmount />

			<ReviewTransferButton />
		</>
	)
}
