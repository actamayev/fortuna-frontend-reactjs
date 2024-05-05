import _ from "lodash"
import { useEffect } from "react"
import useRetrieveSolPrice from "./retrieve-sol-price"
import { useSolanaContext } from "../../contexts/solana-context"

export default function useRetrieveSolPriceUseEffect(): void {
	const solanaClass = useSolanaContext()
	const retrieveSolPrice = useRetrieveSolPrice()

	useEffect(() => {
		if (_.isNull(solanaClass)) return
		const currentTime = new Date()
		if (
			_.isNull(solanaClass.solPriceDetails) ||
			new Date(solanaClass.solPriceDetails.lastRetrievedTime).getTime() + 30000 < currentTime.getTime()
		) void retrieveSolPrice()
	}, [retrieveSolPrice, solanaClass, solanaClass?.walletBalanceSol])
}
