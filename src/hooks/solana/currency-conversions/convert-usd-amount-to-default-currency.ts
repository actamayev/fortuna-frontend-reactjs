import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

export default function useConvertUsdAmountDefaultCurrency(): (
	usdAmountToConvert: number
) => number {
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	const convertUsdAmountToDefaultCurrency = useCallback((
		usdAmountToConvert: number
	) => {
		try {
			if (_.isNull(personalInfoClass)) return 0

			if (personalInfoClass.getDefaultCurrency() === "usd") {
				return _.round(usdAmountToConvert, 2)
			}

			if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return 0

			return _.round(usdAmountToConvert / solanaClass.solPriceDetails.solPriceInUSD, 4)
		} catch (error) {
			console.error(error)
			return 0
		}
	}, [personalInfoClass, solanaClass])

	return convertUsdAmountToDefaultCurrency
}
