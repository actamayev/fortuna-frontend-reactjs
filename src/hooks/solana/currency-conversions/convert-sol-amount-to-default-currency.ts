import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

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

			if (personalInfoClass.getDefaultCurrency() === "sol") {
				return _.round(solAmountToConvert, 4)
			}

			if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

			return _.round(solAmountToConvert * solanaClass.solPriceDetails.solPriceInUSD, 2)
		} catch (error) {
			console.error(error)
			return null
		}
	}, [personalInfoClass, solanaClass])

	return convertSolAmountToDefaultCurrency
}
