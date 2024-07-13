import _ from "lodash"
import { useCallback } from "react"
import useRetrieveSolPrice from "../retrieve-sol-price"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

export default function useTransferFunds(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const retrieveSolPrice = useRetrieveSolPrice()
	const notificationsClass = useNotificationsContext()

	// eslint-disable-next-line complexity
	return useCallback(async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				_.isNull(personalInfoClass) ||
				_.isNull(positionsAndTransactionsClass)
			) return
			setIsLoading(true)
			let sendingTo
			if (solanaClass.moneyTransferDetails.transferOption === "publicKey") {
				sendingTo = solanaClass.moneyTransferDetails.publicKey
			} else {
				sendingTo = solanaClass.moneyTransferDetails.username
			}

			await retrieveSolPrice()
			if (_.isNull(solanaClass.solPriceDetails)) return
			const moneyTransferData: MoneyTransferData = {
				sendingTo,
				transferAmount: solanaClass.moneyTransferDetails.transferAmount,
				transferCurrency: personalInfoClass.defaultCurrency
			}

			let transferSolResponse
			if (solanaClass.moneyTransferDetails.transferOption === "publicKey") {
				transferSolResponse = await fortunaApiClient.solanaDataService.moneyTransferToPublicKey(moneyTransferData)
			} else {
				transferSolResponse = await fortunaApiClient.solanaDataService.moneyTransferToUsername(moneyTransferData)
			}
			if (!_.isEqual(transferSolResponse.status, 200) || isNonSuccessResponse(transferSolResponse.data)) {
				throw Error("Error transferring sol")
			}
			solanaClass.setIsMoneyTransferButtonPressed(false)
			solanaClass.resetMoneyTransferDetails()
			positionsAndTransactionsClass.addSolanaTransaction(transferSolResponse.data.solTransferData)
			if (moneyTransferData.transferCurrency === "sol") {
				solanaClass.alterWalletBalanceSol(-moneyTransferData.transferAmount)
			} else {
				solanaClass.alterWalletBalanceUsd(-moneyTransferData.transferAmount)
			}
			notificationsClass.setPositiveNotification("Funds transferred")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to complete money transfer at this time. Please reload page and try again")
		} finally {
			setIsLoading(false)
		}
	}, [solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService,
		personalInfoClass, positionsAndTransactionsClass, retrieveSolPrice, notificationsClass])
}
