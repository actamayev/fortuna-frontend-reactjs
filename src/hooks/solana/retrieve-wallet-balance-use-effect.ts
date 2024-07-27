import _ from "lodash"
import { useEffect } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import useRetrieveWalletBalance from "./retrieve-wallet-balance"

export default function useRetrieveWalletBalanceUseEffect(): void {
	const solanaClass = useSolanaContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	useEffect(() => {
		if (!_.isNull(solanaClass.walletBalanceSol)) return
		void retrieveWalletBalance()
	}, [retrieveWalletBalance, solanaClass.walletBalanceSol])
}
