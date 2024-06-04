/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useMemo, useState } from "react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useTransferSol from "../../../../hooks/solana/transfer-sol/transfer-sol"
import useConfirmUserHasEnoughSolToTransfer from "../../../../hooks/solana/transfer-sol/confirm-user-has-enough-sol-to-transfer"

function ConfirmTransferButton() {
	const solanaClass = useSolanaContext()
	const transferSol = useTransferSol()
	const [isLoading, setIsLoading] = useState(false)
	const [doesUserHaveEnoughSol, setDoesUserHaveEnoughSol] = useState(false)
	const confirmUserHasEnoughSolToTransfer = useConfirmUserHasEnoughSolToTransfer()

	useEffect(() => {
		confirmUserHasEnoughSolToTransfer(setDoesUserHaveEnoughSol)
	}, [solanaClass?.transferSolDetails.transferStage])

	const isTransferAmountZero = useMemo(() => {
		if (_.isNull(solanaClass)) return true
		return _.isEqual(solanaClass.transferSolDetails.transferAmount, 0)
	}, [solanaClass, solanaClass?.transferSolDetails.transferAmount])

	return (
		<>
			<Button
				onClick={() => transferSol(setIsLoading)}
				colorClass="bg-blue-200 dark:bg-blue-400"
				hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
				title="Confirm Transfer"
				disabled={isLoading || !doesUserHaveEnoughSol || isTransferAmountZero}
				className="font-semibold dark:tex-zinc-950"
			/>
			{!doesUserHaveEnoughSol && <>Not enough Sol to complete transfer</>}
		</>
	)
}

export default observer(ConfirmTransferButton)
