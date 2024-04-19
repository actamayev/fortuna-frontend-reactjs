import _ from "lodash"
import { useRef } from "react"
import { observer } from "mobx-react"
import Button from "../../button"
import TransferSolCard from "./transfer-sol-card"
import { useSolanaContext } from "../../../contexts/solana-context"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"

function TransferSolButton() {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const solanaClass = useSolanaContext()
	useClickOutSideUseEffect(dropdownRef, solanaClass?.setIsTransferSolButtonPressed)

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<Button
				title="Transfer Funds"
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				onClick={() => solanaClass.setIsTransferSolButtonPressed(!solanaClass.isTransferSolButtonPressed)}
				className="font-semibold"
			/>
			<div ref = {dropdownRef}>
				{solanaClass.isTransferSolButtonPressed && <TransferSolCard />}
			</div>
		</>
	)
}

export default observer(TransferSolButton)
