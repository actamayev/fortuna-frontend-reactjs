import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useTransferSol from "../../../../hooks/solana/transfer-sol/transfer-sol"
import useConfirmUserHasEnoughSolToTransfer from "../../../../hooks/solana/transfer-sol/confirm-user-has-enough-sol-to-transfer"

function ConfirmTransactionButton() {
	const solanaClass = useSolanaContext()
	const transferSol = useTransferSol()
	const [isLoading, setIsLoading] = useState(false)
	const [doesUserHaveEnoughSol, setDoesUserHaveEnoughSol] = useState(false)
	const confirmUserHasEnoughSolToTransfer = useConfirmUserHasEnoughSolToTransfer()

	useEffect(() => {
		confirmUserHasEnoughSolToTransfer(setDoesUserHaveEnoughSol)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass?.transferSolDetails.transferStage])

	if (_.isNull(solanaClass) || _.isEqual(solanaClass.transferSolDetails.solAmount, 0)) return null

	return (
		<>
			<Button
				onClick={() => transferSol(setIsLoading)}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title="Confirm Transaction"
				disabled={isLoading || !doesUserHaveEnoughSol}
				className="font-semibold"
			/>
			{!doesUserHaveEnoughSol && <>Not enough Sol to complete transfer</>}
		</>
	)
}

export default observer(ConfirmTransactionButton)
