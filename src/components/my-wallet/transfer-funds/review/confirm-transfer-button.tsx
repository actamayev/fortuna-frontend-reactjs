/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import Button from "../../../buttons/button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useTransferFunds from "../../../../hooks/solana/transfer-funds/transfer-funds"
import useConfirmUserHasSufficientFundsToTransfer
	from "../../../../hooks/solana/transfer-funds/confirm-user-has-sufficient-funds-to-transfer"

function ConfirmTransferButton() {
	const solanaClass = useSolanaContext()
	const transferSol = useTransferFunds()
	const [isLoading, setIsLoading] = useState(false)
	const [doesUserHaveSufficientFunds, setDoesUserHaveSufficientFunds] = useState(false)
	const confirmUserHasSufficientFundsToTransfer = useConfirmUserHasSufficientFundsToTransfer()

	useEffect(() => {
		confirmUserHasSufficientFundsToTransfer(setDoesUserHaveSufficientFunds)
	}, [solanaClass?.transferFundsDetails.transferStage])

	const isTransferAmountZero = useMemo(() => {
		if (_.isNull(solanaClass)) return true
		return _.isEqual(solanaClass.transferFundsDetails.transferAmount, 0)
	}, [solanaClass, solanaClass?.transferFundsDetails.transferAmount])

	const transferSolCallback = useCallback(async () => {
		await transferSol(setIsLoading)
	}, [])

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
