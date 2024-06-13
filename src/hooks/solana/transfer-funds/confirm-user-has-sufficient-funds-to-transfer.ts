/* eslint-disable max-depth */
import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

export default function useConfirmUserHasSufficientFundsToTransfer(): (
	setDoesUserHaveSufficientFunds: React.Dispatch<React.SetStateAction<boolean>>
) => void {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const confirmUserHasSufficientFundsToTransfer = useCallback((
		setDoesUserHaveSufficientFunds: React.Dispatch<React.SetStateAction<boolean>>
	): void => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(solanaClass.walletBalanceSol) ||
				_.isNull(personalInfoClass)
			) return
			setDoesUserHaveSufficientFunds(false)
			const myWalletBalanceSol = solanaClass.walletBalanceSol

			if (
				solanaClass.transferFundsDetails.transferOption === "publicKey" &&
				solanaClass.transferFundsDetails.isPublicKeyRegisteredWithFortuna === false
			) {
				if (personalInfoClass.defaultCurrency === "sol") {
					if (myWalletBalanceSol < solanaClass.transferFundsDetails.transferAmount + 0.000005) {
						setDoesUserHaveSufficientFunds(false)
						return
					}
				} else {
					const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
					if (_.isUndefined(solPriceInUSD)) return
					if (solanaClass.walletBalanceUSD.get() < solanaClass.transferFundsDetails.transferAmount + (0.000005 * solPriceInUSD)) {
						setDoesUserHaveSufficientFunds(false)
						return
					}
				}
			} else {
				if (personalInfoClass.defaultCurrency === "sol") {
					if (myWalletBalanceSol < solanaClass.transferFundsDetails.transferAmount) {
						setDoesUserHaveSufficientFunds(false)
						return
					}
				} else {
					const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
					if (_.isUndefined(solPriceInUSD)) return
					const myWalletBalanceUsd = myWalletBalanceSol * solPriceInUSD
					if (myWalletBalanceUsd < solanaClass.transferFundsDetails.transferAmount) {
						setDoesUserHaveSufficientFunds(false)
						return
					}
				}
			}
			setDoesUserHaveSufficientFunds(true)
		} catch (error) {
			console.error(error)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, solanaClass, solanaClass?.walletBalanceSol])

	return confirmUserHasSufficientFundsToTransfer
}
