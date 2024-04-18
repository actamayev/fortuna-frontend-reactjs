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
			if (_.isNull(personalInfoClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			const newCurrency = personalInfoClass.defaultCurrency === "usd" ? "sol" : "usd"
			const defaultCurrencyResponse = await fortunaApiClient.personalInfoDataService.setDefaultCurrency(newCurrency)
			if (!_.isEqual(defaultCurrencyResponse.status, 200) || isErrorResponse(defaultCurrencyResponse.data)) {
				throw Error("Unable to save new default currency")
			}
			personalInfoClass.setDefaultCurrency(newCurrency)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService, personalInfoClass])

	return setDefaultCurrency
}
