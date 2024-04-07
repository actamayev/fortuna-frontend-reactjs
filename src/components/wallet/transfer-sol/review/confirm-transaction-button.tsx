import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../../../button"
import useTransferSol from "../../../../hooks/solana/transfer-sol"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferButton() {
	const solanaClass = useSolanaContext()
	const transferSol = useTransferSol()
	const [isLoading, setIsLoading] = useState(false)

	if (_.isNull(solanaClass) || _.isEqual(solanaClass.transferSolDetails.solAmount, 0)) return null

	return (
		<Button
			onClick={() => transferSol(setIsLoading)}
			colorClass="bg-blue-500"
			hoverClass="hover:bg-blue-600"
			title="Confirm Transaction"
			disabled={isLoading}
		/>
	)
}

export default observer(ReviewTransferButton)
