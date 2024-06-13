import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import Button from "../../../buttons/button"
import { useSolanaContext } from "../../../../contexts/solana-context"

function ReviewTransferButton() {
	const solanaClass = useSolanaContext()

	const updateTransferFundsDetails = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferFundsDetails("transferStage", "review")
	}, [solanaClass])

	const isButtonDisabled = useMemo(() => {
		if (_.isNull(solanaClass)) return true
		if (_.isEqual(solanaClass.transferFundsDetails.transferAmount, 0)) return true
		if (
			solanaClass.transferFundsDetails.transferOption === "username" &&
			solanaClass.transferFundsDetails.isUsernameSelected === false
		) return true
		if (_.isNull(solanaClass.walletPublicKey)) return true
		if (
			solanaClass.transferFundsDetails.transferOption === "publicKey" &&
			(
				solanaClass.transferFundsDetails.doesPublicKeyExist === false ||
				solanaClass.transferFundsDetails.publicKey === solanaClass.walletPublicKey.toString())
		) {
			return true
		}
		return false
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferFundsDetails.transferAmount, solanaClass?.transferFundsDetails.transferOption,
		solanaClass?.transferFundsDetails.doesPublicKeyExist, solanaClass?.transferFundsDetails.isUsernameSelected,
		solanaClass?.walletPublicKey, solanaClass?.transferFundsDetails.publicKey])

	return (
		<Button
			title="Review Transfer"
			onClick={updateTransferFundsDetails}
			colorClass="bg-blue-200 dark:bg-blue-400"
			hoverClass="hover:bg-blue-300 hover:dark:bg-blue-500"
			className="font-semibold text-zinc-950"
			disabled={isButtonDisabled}
		/>
	)
}

export default observer(ReviewTransferButton)
