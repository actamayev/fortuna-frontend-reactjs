import _ from "lodash"
import { useCallback } from "react"
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { useSolanaContext } from "../../contexts/solana-context"

export default function useRequestAirdrop(): (
	setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const solanaClass = useSolanaContext()

	// TODO: Figure out why this doesn't work
	return useCallback(async (
		setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(solanaClass.walletPublicKey)
			) return
			setIsButtonDisabled(true)

			const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

			const latestBlockHash = await connection.getLatestBlockhash()

			const signature = await connection.requestAirdrop(solanaClass.walletPublicKey, 1 * LAMPORTS_PER_SOL)

			await connection.confirmTransaction({
				blockhash: latestBlockHash.blockhash,
				lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
				signature
			})
			solanaClass.alterWalletBalanceSol(1)
		} catch (error) {
			console.error(error)
		} finally {
			setIsButtonDisabled(false)
		}
	}, [solanaClass])
}
