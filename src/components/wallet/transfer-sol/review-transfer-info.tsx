import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"
import ConfirmTransactionButton from "./review/confirm-transaction-button"

function ReviewTransferInfo() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

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
			<div className="text-center font-semibold">
				Review Transaction
			</div>

			Sending {solanaClass.transferSolDetails.solAmount} Sol to
			<br />
			{solanaClass.transferSolDetails.transferOption === "username" && solanaClass.transferSolDetails.username}
			{solanaClass.transferSolDetails.transferOption === "publicKey" && solanaClass.transferSolDetails.publicKey}
			<br />
			Fee: <FeeSection />
			<ConfirmTransactionButton />
		</>
	)
}

export default observer(ReviewTransferInfo)
