import SelectTransferAmount from "./select-transfer-amount"
import ReviewTransferButton from "./review-transfer-button"
import SelectTransferOption from "./select-transfer-option"
import OptionsToTransferMoneyBy from "./options-to-transfer-money-by"

export default function InitialTransferInfo() {
	return (
		<>
			<div className="text-center font-semibold text-lg">Transfer money</div>
			<SelectTransferOption />

			<OptionsToTransferMoneyBy />

			<SelectTransferAmount />

			<ReviewTransferButton />
		</>
	)
}
