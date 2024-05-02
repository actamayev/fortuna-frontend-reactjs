import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useUpdateTransferSolDetiailsNewDefaultCurrency() : (
	newDefaultCurrency: Currencies
) => void {
	const solanaClass = useSolanaContext()

	const updateTransferSolDetailsNewDefaultCurrency = useCallback((newDefaultCurrency: Currencies) => {
		try {
			if (_.isNull(solanaClass) || _.isUndefined(solanaClass.solPriceDetails?.solPriceInUSD)) return
			if (newDefaultCurrency === "sol") {
				solanaClass.updateTransferSolDetails(
					"transferAmount",
					solanaClass.transferSolDetails.transferAmount / solanaClass.solPriceDetails.solPriceInUSD
				)
			} else {
				solanaClass.updateTransferSolDetails(
					"transferAmount",
					solanaClass.transferSolDetails.transferAmount * solanaClass.solPriceDetails.solPriceInUSD
				)
			}
		} catch (error) {
			console.error(error)
		}
	}, [solanaClass])

	return updateTransferSolDetailsNewDefaultCurrency
}
