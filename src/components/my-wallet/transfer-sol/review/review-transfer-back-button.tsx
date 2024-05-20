import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
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
			title="<"
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			onClick={updateTransferSolDetails}
			className="font-semibold"
		/>
	)
}

export default observer(ReviewTransferBackButton)
