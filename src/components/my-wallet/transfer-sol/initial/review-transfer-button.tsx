import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../buttons/button"
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
			solanaClass.transferSolDetails.transferOption === "username" &&
			solanaClass.transferSolDetails.isUsernameSelected === false
		) return true
		if (
			solanaClass.transferSolDetails.transferOption === "publicKey" &&
			solanaClass.transferSolDetails.doesPublicKeyExist === false
		) return true
		return false
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferSolDetails.transferAmount, solanaClass?.transferSolDetails.transferOption,
		solanaClass?.transferSolDetails.doesPublicKeyExist, solanaClass?.transferSolDetails.isUsernameSelected])

	return (
		<Button
			onClick={updateTransferSolDetails}
			colorClass="bg-blue-200 dark:bg-blue-400"
			hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
			title="Review Transfer"
			className="font-semibold dark:text-zinc-950"
			disabled={isButtonDisabled}
		/>
	)
}

export default observer(ReviewTransferButton)
