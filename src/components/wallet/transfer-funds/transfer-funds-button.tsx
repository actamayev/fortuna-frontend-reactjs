import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useRef } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import Button from "../../buttons/button"
import TransferFundsCard from "./transfer-funds-card"
import { useSolanaContext } from "../../../contexts/solana-context"
import useClickOutSideUseEffect from "../../../hooks/click-outside-use-effect"

function TransferFundsButton() {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const solanaClass = useSolanaContext()
	useClickOutSideUseEffect(dropdownRef, solanaClass?.setIsTransferFundsButtonPressed)

	const setIsTransferFundsButtonPressed = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.setIsTransferFundsButtonPressed(!solanaClass.isTransferFundsButtonPressed)
	}, [solanaClass])

	return (
		<>
			<Button
				title="Transfer Funds"
				titleIcon={<FaArrowAltCircleUp />}
				colorClass="bg-blue-500 dark:bg-blue-400"
				hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
				onClick={setIsTransferFundsButtonPressed}
				className="text-white dark:text-zinc-950 font-medium"
			/>
			<div ref={dropdownRef}>
				<TransferFundsCard />
			</div>
		</>
	)
}

export default observer(TransferFundsButton)
