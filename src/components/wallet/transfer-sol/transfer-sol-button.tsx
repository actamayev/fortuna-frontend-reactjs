import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../button"
import TransferSolCard from "./transfer-sol-card"
import { useSolanaContext } from "../../../contexts/solana-context"

function TransferSolButton() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null
	return (
		<>
			<Button
				title="Transfer Sol"
				colorClass="bg-blue-400"
				hoverClass="hover:bg-blue-500"
				onClick={() => solanaClass.setIsTransferSolButtonPressed(!solanaClass.isTransferSolButtonPressed)}
			/>
			{ solanaClass.isTransferSolButtonPressed && <TransferSolCard /> }
		</>
	)
}

export default observer(TransferSolButton)
