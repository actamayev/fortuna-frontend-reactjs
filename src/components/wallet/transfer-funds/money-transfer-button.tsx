import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import Button from "../../buttons/button"
import TransferMoneyCard from "./transfer-money-card"
import { useSolanaContext } from "../../../contexts/solana-context"

function MoneyTransferButton() {
	const solanaClass = useSolanaContext()

	const setIsMoneyTransferButtonPressed = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.setIsMoneyTransferButtonPressed(!solanaClass.isMoneyTransferButtonPressed)
	}, [solanaClass])

	return (
		<>
			<Button
				title="Transfer money"
				titleIcon={<FaArrowAltCircleUp />}
				colorClass="bg-blue-500 dark:bg-blue-400"
				hoverClass="hover:bg-blue-600 dark:hover:bg-blue-500"
				onClick={setIsMoneyTransferButtonPressed}
				className="text-white dark:text-zinc-950 font-medium"
				style={{ padding: "6px" }}
			/>
			<TransferMoneyCard />
		</>
	)
}

export default observer(MoneyTransferButton)
