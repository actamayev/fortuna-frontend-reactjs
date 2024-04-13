import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../button"
import ConfirmTransactionButton from "./confirm-transaction-button"
import { useSolanaContext } from "../../../../contexts/solana-context"

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
				<Button
					title="<"
					colorClass="bg-blue-300"
					hoverClass="hover:bg-blue-400"
					onClick={() => solanaClass.updateTransferSolDetails("transferStage", "initial")}
				/>
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
