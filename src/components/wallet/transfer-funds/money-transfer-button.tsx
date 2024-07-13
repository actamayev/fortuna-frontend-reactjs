import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useRef } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import Button from "../../buttons/button"
import TransferMoneyCard from "./transfer-money-card"
import { useSolanaContext } from "../../../contexts/solana-context"
import useClickOutsideUseEffect from "../../../hooks/click-outside/click-outside-use-effect"

function MoneyTransferButton() {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const solanaClass = useSolanaContext()
	useClickOutsideUseEffect(dropdownRef, solanaClass?.setIsMoneyTransferButtonPressed)

	const setIsMoneyTransferButtonPressed = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.setIsMoneyTransferButtonPressed(!solanaClass.isMoneyTransferButtonPressed)
	}, [solanaClass])

	return (
		<>
			<Button
				title="Transfer Money"
				titleIcon={<FaArrowAltCircleUp />}
				colorClass="bg-blue-500 dark:bg-blue-400"
				hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
				onClick={setIsMoneyTransferButtonPressed}
				className="text-white dark:text-zinc-950 font-medium"
				style={{ padding: "6px" }}
			/>
			<div ref={dropdownRef}>
				<TransferMoneyCard />
			</div>
		</>
	)
}

export default observer(MoneyTransferButton)
