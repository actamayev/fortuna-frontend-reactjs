import _ from "lodash"
import { useCallback, useRef } from "react"
import { observer } from "mobx-react"
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
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				onClick={setIsTransferSolButtonPressed}
				className="font-semibold"
			/>
			<div ref = {dropdownRef}>
				<TransferSolCard />
			</div>
		</>
	)
}

export default observer(TransferSolButton)
