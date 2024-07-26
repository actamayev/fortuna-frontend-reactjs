import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import Button from "../../../buttons/button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useTransferFunds from "../../../../hooks/solana/money-transfer/money-transfer"
import useConfirmSufficientMoneyToTransfer
	from "../../../../hooks/solana/money-transfer/confirm-sufficient-money-to-transfer"

function ConfirmTransferButton() {
	const solanaClass = useSolanaContext()
	const transferSol = useTransferFunds()
	const [isLoading, setIsLoading] = useState(false)
	const [doesUserHaveSufficientFunds, setDoesUserHaveSufficientFunds] = useState(false)
	const confirmSufficientMoneyToTransfer = useConfirmSufficientMoneyToTransfer()

	useEffect(() => {
		confirmSufficientMoneyToTransfer(setDoesUserHaveSufficientFunds)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass.moneyTransferDetails.transferStage])

	const isTransferAmountZero = useMemo(() => {
		return _.isEqual(solanaClass.moneyTransferDetails.transferAmount, 0)
	}, [solanaClass.moneyTransferDetails.transferAmount])

	const transferSolCallback = useCallback(async () => {
		await transferSol(setIsLoading)
	}, [transferSol])

	return (
		<>
			<Button
				onClick={transferSolCallback}
				colorClass="bg-blue-200 dark:bg-blue-400"
				hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
				title="Confirm Transfer"
				disabled={isLoading || !doesUserHaveSufficientFunds || isTransferAmountZero}
				className="font-semibold text-zinc-950"
			/>
			{!doesUserHaveSufficientFunds && <>Insufficient funds to complete transfer</>}
		</>
	)
}

export default observer(ConfirmTransferButton)
