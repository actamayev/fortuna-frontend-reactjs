import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import ConfirmTransactionButton from "./confirm-transaction-button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useConvertSolAmountDefaultCurrency from "../../../../hooks/solana/currency-conversions/convert-sol-amount-to-default-currency"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()
	const convertSolAmountToDefaultCurrency = useConvertSolAmountDefaultCurrency()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	// TODO: Change this to adjust for the default currency
	const FeeSection = observer(() => {
		if (solanaClass.transferSolDetails.transferOption === "publicKey") {
			if (solanaClass.transferSolDetails.isPublicKeyRegisteredWithFortuna === true) {
				return <>0 Sol (internal transfer)</>
			}
			return <>Variable Fee (depends on network traffic)</>
		}
		return <>0 Sol (internal transfer)</>
	})

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
				Review Transaction
				</div>
			</div>
			<div>
			Sending
				{personalInfoClass.getDefaultCurrency() === "usd" && (<> $</>)}
				{personalInfoClass.getDefaultCurrency() === "sol" && (<> </>)}
				{convertSolAmountToDefaultCurrency(solanaClass.transferSolDetails.solAmount)}
				{personalInfoClass.getDefaultCurrency() === "sol" && (<> Sol</>)} to {" "}

				{solanaClass.transferSolDetails.transferOption === "username" && solanaClass.transferSolDetails.username}
				{solanaClass.transferSolDetails.transferOption === "publicKey" && solanaClass.transferSolDetails.publicKey}
			</div>
			Fee: <FeeSection />
			<ConfirmTransactionButton />
		</>
	)
}

export default observer(ReviewTransferInfo)
