import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../button"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferButton() {
	const solanaClass = useSolanaContext()

	const updateTransferSolDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferSolDetails("transferStage", "review")
	}, [solanaClass])

	const isButtonDisabled = useMemo(() => {
		if (_.isNull(solanaClass)) return true
		if (_.isEqual(solanaClass.transferSolDetails.transferAmount, 0)) return true
		if (
			solanaClass.transferSolDetails.doesPublicKeyExist === false &&
			solanaClass.transferSolDetails.isUsernameSelected === false
		) return true
		return false
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferSolDetails.transferAmount,
		solanaClass?.transferSolDetails.doesPublicKeyExist, solanaClass?.transferSolDetails.isUsernameSelected])

	return (
		<Button
			onClick={updateTransferSolDetails}
			colorClass="bg-blue-200"
			hoverClass="hover:bg-blue-300"
			title="Review Transfer"
			className="font-semibold"
			disabled={isButtonDisabled}
		/>
	)
}

export default observer(ReviewTransferButton)
