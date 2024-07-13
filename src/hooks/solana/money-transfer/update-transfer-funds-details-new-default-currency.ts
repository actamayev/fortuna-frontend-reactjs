import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useUpdateTransferFundsDetiailsNewDefaultCurrency() : (
	newDefaultCurrency: Currencies
) => void {
	const solanaClass = useSolanaContext()

	return useCallback((newDefaultCurrency: Currencies) => {
		try {
			if (_.isNull(solanaClass) || _.isUndefined(solanaClass.solPriceDetails?.solPriceInUSD)) return
			if (newDefaultCurrency === "sol") {
				solanaClass.updateMoneyTransferDetails(
					"transferAmount",
					solanaClass.moneyTransferDetails.transferAmount / solanaClass.solPriceDetails.solPriceInUSD
				)
			} else {
				solanaClass.updateMoneyTransferDetails(
					"transferAmount",
					solanaClass.moneyTransferDetails.transferAmount * solanaClass.solPriceDetails.solPriceInUSD
				)
			}
		} catch (error) {
			console.error(error)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.solPriceDetails?.solPriceInUSD])
}
