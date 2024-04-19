import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetDefaultCurrency(): () => Promise<void> {
	const personalInfoClass = usePersonalInfoContext()
	const fortunaApiClient = useApiClientContext()

	const setDefaultCurrency = useCallback(async () => {
		try {
			// FUTURE TODO: Check the solana Context for the last time the Sol price was retrieved.
			// If the price was retrieved longer than 1 minute ago, re-retrieve it.
			if (_.isNull(personalInfoClass)) return
			const newCurrency = personalInfoClass.defaultCurrency === "usd" ? "sol" : "usd"
			if (!_.isNull(fortunaApiClient.httpClient.accessToken)) {
				const defaultCurrencyResponse = await fortunaApiClient.personalInfoDataService.setDefaultCurrency(newCurrency)
				if (!_.isEqual(defaultCurrencyResponse.status, 200) || isErrorResponse(defaultCurrencyResponse.data)) {
					throw Error("Unable to save new default currency")
				}
			}
			personalInfoClass.setDefaultCurrency(newCurrency)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService, personalInfoClass])

	return setDefaultCurrency
}
