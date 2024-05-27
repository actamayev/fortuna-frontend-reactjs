import _ from "lodash"
import { useEffect, useCallback } from "react"
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRetrieveWalletBalanceUseEffect(): void {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	const retrieveWalletBalance = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(solanaClass.walletPublicKey) ||
				_.isNil(personalInfoClass?.username) ||
				solanaClass.isRetrievingWalletDetails === true
			) return

			solanaClass.setIsRetrievingWalletDetails(true)
			const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

			const balanceInLamports = await connection.getBalance(solanaClass.walletPublicKey)
			const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL

			solanaClass.walletBalanceSol = balanceInSol
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingWalletDetails(false)
		}
	}, [solanaClass, personalInfoClass?.username])

	useEffect(() => {
		if (!_.isNil(solanaClass?.walletBalanceSol)) return
		void retrieveWalletBalance()
	}, [retrieveWalletBalance, solanaClass?.walletBalanceSol])
}
