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

			if (personalInfoClass.getDefaultCurrency() === "usd") return usdAmountToConvert

			if (_.isNull(solanaClass) || _.isNull(solanaClass.solPriceDetails)) return null

			return usdAmountToConvert / solanaClass.solPriceDetails.solPriceInUSD
		} catch (error) {
			console.error(error)
			return null
		}
	}, [personalInfoClass, solanaClass])

	return convertUsdAmountToDefaultCurrency
}
