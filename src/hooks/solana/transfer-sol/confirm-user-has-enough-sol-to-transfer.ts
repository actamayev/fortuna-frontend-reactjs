/* eslint-disable max-depth */
import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

export default function useConfirmUserHasEnoughSolToTransfer(): (
	setDoesUserHaveEnoughSol: React.Dispatch<React.SetStateAction<boolean>>
) => void {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const confirmUserHasEnoughSolToTransfer = useCallback((
		setDoesUserHaveEnoughSol: React.Dispatch<React.SetStateAction<boolean>>
	): void => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(solanaClass.walletBalanceSol) ||
				_.isNull(personalInfoClass)
			) return
			setDoesUserHaveEnoughSol(false)
			const myWalletBalanceSol = solanaClass.walletBalanceSol

			if (
				solanaClass.transferSolDetails.transferOption === "publicKey" &&
				solanaClass.transferSolDetails.isPublicKeyRegisteredWithFortuna === false
			) {
				if (personalInfoClass.getDefaultCurrency() === "sol") {
					if (myWalletBalanceSol < solanaClass.transferSolDetails.transferAmount + 0.000005) {
						setDoesUserHaveEnoughSol(false)
						return
					}
				} else {
					const solPrice = solanaClass.solPriceDetails?.solPriceInUSD
					if (_.isUndefined(solPrice)) return
					const myWalletBalanceUsd = myWalletBalanceSol * solPrice
					// TODO: convert 0.00005 to usd eforeadding
					if (myWalletBalanceUsd < solanaClass.transferSolDetails.transferAmount + (0.000005 * solPrice)) {
						setDoesUserHaveEnoughSol(false)
						return
					}
				}
			} else {
				if (personalInfoClass.getDefaultCurrency() === "sol") {
					if (myWalletBalanceSol < solanaClass.transferSolDetails.transferAmount) {
						setDoesUserHaveEnoughSol(false)
						return
					}
				} else {
					const solPrice = solanaClass.solPriceDetails?.solPriceInUSD
					if (_.isUndefined(solPrice)) return
					const myWalletBalanceUsd = myWalletBalanceSol * solPrice
					if (myWalletBalanceUsd < solanaClass.transferSolDetails.transferAmount) {
						setDoesUserHaveEnoughSol(false)
						return
					}
				}
			}
			setDoesUserHaveEnoughSol(true)
		} catch (error) {
			console.error(error)
		}
	}, [personalInfoClass, solanaClass])

	return confirmUserHasEnoughSolToTransfer
}
