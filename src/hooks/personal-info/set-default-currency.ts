import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import useRetrieveSolPrice from "../solana/retrieve-sol-price"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetDefaultCurrency(): () => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveSolPrice = useRetrieveSolPrice()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const setDefaultCurrency = useCallback(async () => {
		try {
			if (_.isNull(personalInfoClass)) return
			const newCurrency = personalInfoClass.getDefaultCurrency() === "usd" ? "sol" : "usd"
			personalInfoClass.setDefaultCurrency(newCurrency)

			// If the last sol price was retrieved more than 60 seconds ago, retrieve it from the backend again.
			const currentTime = new Date()
			if (
				!_.isNull(solanaClass) &&
				!_.isNull(solanaClass.solPriceDetails) &&
				new Date(solanaClass.solPriceDetails.lastRetrieved).getTime() + 30000 < currentTime.getTime()
			) {
				await retrieveSolPrice()
			}

			if (!_.isNull(fortunaApiClient.httpClient.accessToken)) {
				const defaultCurrencyResponse = await fortunaApiClient.personalInfoDataService.setDefaultCurrency(newCurrency)
				if (!_.isEqual(defaultCurrencyResponse.status, 200) || isErrorResponse(defaultCurrencyResponse.data)) {
					throw Error("Unable to save new default currency")
				}
			}
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService,
		personalInfoClass, retrieveSolPrice, solanaClass])

	return setDefaultCurrency
}
