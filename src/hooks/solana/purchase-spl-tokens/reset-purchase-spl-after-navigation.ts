import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useResetPurchaseSplAfterNavigation(): void {
	const location = useLocation()
	const solanaClass = useSolanaContext()

	const resetPurchaseSplAfterNavigation = useCallback(() => {
		try {
			if (_.isNull(solanaClass)) return
			solanaClass.resetPurchaseSplSharesDetails()
		} catch (error) {
			console.error(error)
		}
	}, [solanaClass])

	useEffect(() => {
		resetPurchaseSplAfterNavigation()
	}, [location, resetPurchaseSplAfterNavigation])
}
