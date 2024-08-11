import _ from "lodash"
import { useCallback } from "react"
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRetrieveWalletBalance(): () => Promise<void> {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	return useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass.walletPublicKey) ||
				_.isNull(personalInfoClass.username) ||
				solanaClass.isRetrievingWalletDetails === true
			) return

			solanaClass.setIsRetrievingWalletDetails(true)
			const clusterUrl = "https://sleek-sparkling-waterfall.solana-mainnet.quiknode.pro/2304791a7554e508e4d429ba1adb4f91d5a9c7c5"
			const connection = new Connection(clusterUrl, "confirmed")

			const balanceInLamports = await connection.getBalance(solanaClass.walletPublicKey)
			const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL

			solanaClass.setWalletBalanceSol(balanceInSol)
		} catch (error) {
			console.error(error)
		} finally {
			solanaClass.setIsRetrievingWalletDetails(false)
		}
	}, [solanaClass, personalInfoClass.username])
}
