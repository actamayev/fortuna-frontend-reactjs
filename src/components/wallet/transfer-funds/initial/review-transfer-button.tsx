import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import Button from "../../../buttons/button"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useIsReviewTransferButtonDisabled from "../../../../hooks/solana/is-review-transfer-button-disabled"

function ReviewTransferButton() {
	const solanaClass = useSolanaContext()
	const isReviewTransferButtonDisabled = useIsReviewTransferButtonDisabled()

	const updateTransferFundsDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferFundsDetails("transferStage", "review")
	}, [solanaClass])

	return (
		<Button
			title="Review Transfer"
			onClick={updateTransferFundsDetails}
			colorClass="bg-blue-200 dark:bg-blue-400"
			hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
			className="font-semibold text-zinc-950"
			disabled={isReviewTransferButtonDisabled}
		/>
	)
}

export default observer(ReviewTransferButton)
