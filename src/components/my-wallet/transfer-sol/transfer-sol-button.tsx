import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useRef } from "react"
import Button from "../../button"
import TransferSolCard from "./transfer-sol-card"
import { useSolanaContext } from "../../../contexts/solana-context"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"

function TransferSolButton() {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const solanaClass = useSolanaContext()
	useClickOutSideUseEffect(dropdownRef, solanaClass?.setIsTransferSolButtonPressed)

	const setIsTransferSolButtonPressed = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.setIsTransferSolButtonPressed(!solanaClass.isTransferSolButtonPressed)
	}, [solanaClass])

	return (
		<>
			<Button
				title="Transfer Funds"
				colorClass="bg-blue-500 dark:bg-blue-400"
				hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
				onClick={setIsTransferSolButtonPressed}
				className="text-white dark:tex-zinc-950 font-medium"
			/>
			<div ref = {dropdownRef}>
				<TransferSolCard />
			</div>
		</>
	)
}

export default observer(TransferSolButton)
