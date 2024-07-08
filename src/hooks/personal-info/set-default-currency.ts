import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import useRetrieveSolPrice from "../solana/retrieve-sol-price"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import useUpdateTransferFundsDetiailsNewDefaultCurrency from "../solana/transfer-funds/update-transfer-funds-details-new-default-currency"

export default function useSetDefaultCurrency(): () => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const notificationsClass = useNotificationsContext()
	const retrieveSolPrice = useRetrieveSolPrice()
	const updateTransferFundsDetailsNewDefaultCurrency = useUpdateTransferFundsDetiailsNewDefaultCurrency()

	const setDefaultCurrency = useCallback(async () => {
		try {
			if (_.isNull(personalInfoClass)) return
			const newCurrency = personalInfoClass.defaultCurrency === "usd" ? "sol" : "usd"
			personalInfoClass.setDefaultCurrency(newCurrency)
			updateTransferFundsDetailsNewDefaultCurrency(newCurrency)

			// If the last sol price was retrieved more than 30 seconds ago, retrieve it from the backend again.
			const currentTime = new Date()
			if (
				!_.isNull(solanaClass) &&
				!_.isNull(solanaClass.solPriceDetails) &&
				new Date(solanaClass.solPriceDetails.lastRetrievedTime).getTime() + 30000 < currentTime.getTime()
			) {
				await retrieveSolPrice()
			}

			if (!_.isNull(fortunaApiClient.httpClient.accessToken)) {
				const defaultCurrencyResponse = await fortunaApiClient.personalInfoDataService.setDefaultCurrency(newCurrency)
				if (!_.isEqual(defaultCurrencyResponse.status, 200) || isErrorResponse(defaultCurrencyResponse.data)) {
					throw Error("Unable to save new default currency")
				}
			}
			notificationsClass.setPositiveNotification(`Successfully changed default currency to ${newCurrency.toUpperCase()}`)
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to change default currency at this time. Please reload page and try again.")
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService, personalInfoClass,
		retrieveSolPrice, solanaClass, updateTransferFundsDetailsNewDefaultCurrency, notificationsClass])

	return setDefaultCurrency
}
