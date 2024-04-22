import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import ConfirmTransactionButton from "./confirm-transaction-button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"
import useConvertSolAmountDefaultCurrency from "../../../../hooks/solana/currency-conversions/convert-sol-amount-to-default-currency"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()
	const convertSolAmountToDefaultCurrency = useConvertSolAmountDefaultCurrency()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

	const FeeSection = observer(() => {
		const defaultCurrency = personalInfoClass.getDefaultCurrency()
		let returnText = ""
		if (defaultCurrency === "sol") returnText = "0 Sol (internal transfer)"
		else returnText = "$0.00 (internal transfer)"

		if (solanaClass.transferSolDetails.transferOption === "publicKey") {
			if (solanaClass.transferSolDetails.isPublicKeyRegisteredWithFortuna === true) {
				return <>{returnText}</>
			}
			return <>Variable Fee (depends on network traffic)</>
		}
		return <>{returnText}</>
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
