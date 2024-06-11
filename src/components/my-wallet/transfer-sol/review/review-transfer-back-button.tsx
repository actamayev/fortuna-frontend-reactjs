import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { IoCaretBackOutline } from "react-icons/io5"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferBackButton() {
	const solanaClass = useSolanaContext()

	const updateTransferSolDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferSolDetails("transferStage", "initial")
	}, [solanaClass])

	return (
		<Button
			titleIcon={<IoCaretBackOutline />}
			colorClass="bg-blue-200 dark:bg-blue-400"
			hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
			onClick={updateTransferSolDetails}
			className="font-semibold dark:text-zinc-950"
		/>
	)
}

export default observer(ReviewTransferBackButton)
