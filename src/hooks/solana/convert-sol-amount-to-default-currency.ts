import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useConvertSolAmountDefaultCurrency(): (
	solAmountToConvert: number
) => null | number {
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	const convertSolAmountToDefaultCurrency = useCallback((
		solAmountToConvert: number
	) => {
		try {
			if (_.isNull(personalInfoClass)) return null

			if (personalInfoClass.defaultCurrency === "sol") return solAmountToConvert

			if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

			return solAmountToConvert * solanaClass.solPriceDetails.solPriceInUSD
		} catch (error) {
			console.error(error)
			return null
		}
	}, [personalInfoClass, solanaClass])

	return convertSolAmountToDefaultCurrency
}
