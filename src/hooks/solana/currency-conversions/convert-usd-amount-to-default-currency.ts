import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

export default function useConvertUsdAmountDefaultCurrency(): (
	usdAmountToConvert: number
) => null | number {
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	const convertUsdAmountToDefaultCurrency = useCallback((
		usdAmountToConvert: number
	) => {
		try {
			if (_.isNull(personalInfoClass)) return null

			if (personalInfoClass.getDefaultCurrency() === "usd") {
				return _.round(usdAmountToConvert, 2)
			}

			if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

			return _.round(usdAmountToConvert / solanaClass.solPriceDetails.solPriceInUSD, 4)
		} catch (error) {
			console.error(error)
			return null
		}
	}, [personalInfoClass, solanaClass])

	return convertUsdAmountToDefaultCurrency
}
