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
	const transferSol = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				_.isNull(personalInfoClass) ||
				_.isNull(positionsAndTransactionsClass)
			) return
			setIsLoading(true)
			let sendingTo
			if (solanaClass.transferFundsDetails.transferOption === "publicKey") {
				sendingTo = solanaClass.transferFundsDetails.publicKey
			} else {
				sendingTo = solanaClass.transferFundsDetails.username
			}

			await retrieveSolPrice()
			if (_.isNull(solanaClass.solPriceDetails)) return
			const transferFundsData: TransferFundsData = {
				sendingTo,
				transferAmount: solanaClass.transferFundsDetails.transferAmount,
				transferCurrency: personalInfoClass.defaultCurrency
			}

			let transferSolResponse
			if (solanaClass.transferFundsDetails.transferOption === "publicKey") {
				transferSolResponse = await fortunaApiClient.solanaDataService.transferFundsToPublicKey(transferFundsData)
			} else {
				transferSolResponse = await fortunaApiClient.solanaDataService.transferFundsToUsername(transferFundsData)
			}
			if (!_.isEqual(transferSolResponse.status, 200) || isNonSuccessResponse(transferSolResponse.data)) {
				throw Error("Error transferring sol")
			}
			solanaClass.setIsTransferFundsButtonPressed(false)
			solanaClass.resetTransferFundsDetails()
			positionsAndTransactionsClass.addSolanaTransaction(transferSolResponse.data.solTransferData)
			if (transferFundsData.transferCurrency === "sol") {
				solanaClass.alterWalletBalanceSol(-transferFundsData.transferAmount)
			} else {
				solanaClass.alterWalletBalanceUsd(-transferFundsData.transferAmount)
			}
			notificationsClass.setPositiveNotification("Successfully transferred funds")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to transfer funds at this time. Please reload page and try again")
		} finally {
			setIsLoading(false)
		}
	}, [solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService,
		personalInfoClass, positionsAndTransactionsClass, retrieveSolPrice, notificationsClass])

	return transferSol
}
