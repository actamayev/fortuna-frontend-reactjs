import _ from "lodash"
import { useCallback } from "react"
import useRetrieveSolPrice from "../retrieve-sol-price"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useTransferSol(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const retrieveSolPrice = useRetrieveSolPrice()

	// eslint-disable-next-line complexity
	const transferSol = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				_.isNull(personalInfoClass)
			) return
			setIsLoading(true)
			let sendingTo
			if (solanaClass.transferSolDetails.transferOption === "publicKey") {
				sendingTo = solanaClass.transferSolDetails.publicKey
			} else {
				sendingTo = solanaClass.transferSolDetails.username
			}

			await retrieveSolPrice()
			if (_.isNull(solanaClass.solPriceDetails)) return
			const sendingSolTransfer: SendingSolTransfer = {
				sendingTo,
				transferAmount: solanaClass.transferSolDetails.transferAmount,
				transferCurrency: personalInfoClass.defaultCurrency
			}

			let transferSolResponse
			if (solanaClass.transferSolDetails.transferOption === "publicKey") {
				transferSolResponse = await fortunaApiClient.solanaDataService.transferSolToPublicKey(sendingSolTransfer)
			} else {
				transferSolResponse = await fortunaApiClient.solanaDataService.transferSolToUsername(sendingSolTransfer)
			}
			if (!_.isEqual(transferSolResponse.status, 200) || isNonSuccessResponse(transferSolResponse.data)) {
				throw Error("Error transferring sol")
			}
			solanaClass.setIsTransferSolButtonPressed(false)
			solanaClass.resetTransferSolDetails()
			solanaClass.addSolanaTransaction(transferSolResponse.data.solTransferData)
			if (sendingSolTransfer.transferCurrency === "sol") {
				solanaClass.alterWalletBalanceSol(-sendingSolTransfer.transferAmount)
			} else {
				solanaClass.alterWalletBalanceUsd(-sendingSolTransfer.transferAmount)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, personalInfoClass, retrieveSolPrice])

	return transferSol
}
