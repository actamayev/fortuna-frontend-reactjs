import _ from "lodash"
import { useEffect } from "react"
import useRetrieveWalletBalance from "./retrieve-wallet-balance"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useRetrieveWalletBalanceUseEffect(): void {
	const solanaClass = useSolanaContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	useEffect(() => {
		if (!_.isNil(solanaClass?.walletBalanceSol)) return
		void retrieveWalletBalance()
	}, [retrieveWalletBalance, solanaClass?.walletBalanceSol])
}
