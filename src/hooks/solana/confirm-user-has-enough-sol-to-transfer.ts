import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../contexts/solana-context"

export default function useConfirmUserHasEnoughSolToTransfer(): (
	setDoesUserHaveEnoughSol: React.Dispatch<React.SetStateAction<boolean>>
) => void {
	const solanaClass = useSolanaContext()

	const confirmUserHasEnoughSolToTransfer = useCallback((
		setDoesUserHaveEnoughSol: React.Dispatch<React.SetStateAction<boolean>>
	): void => {
		try {
			if (_.isNull(solanaClass) || _.isNull(solanaClass.walletBalanceSol)) return
			setDoesUserHaveEnoughSol(false)
			const myWalletBalance = solanaClass.walletBalanceSol

			if (
				solanaClass.transferSolDetails.transferOption === "publicKey" &&
				solanaClass.transferSolDetails.isPublicKeyRegisteredWithFortuna === false
			) {
				if (myWalletBalance < solanaClass.transferSolDetails.solAmount + 0.000005) {
					setDoesUserHaveEnoughSol(false)
					return
				}
			} else {
				if (myWalletBalance < solanaClass.transferSolDetails.solAmount) {
					setDoesUserHaveEnoughSol(false)
					return
				}
			}
			setDoesUserHaveEnoughSol(true)
		} catch (error) {
			console.error(error)
		}
	}, [solanaClass])

	return confirmUserHasEnoughSolToTransfer
}
