import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import useRetrieveWalletBalance from "../retrieve-wallet-balance"
import { useSolanaContext } from "../../../contexts/solana-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useTransferSol(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()
	const retrieveWalletBalance = useRetrieveWalletBalance()

	const transferSol = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (_.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			setIsLoading(true)
			let sendingTo
			if (solanaClass.transferSolDetails.transferOption === "publicKey") {
				sendingTo = solanaClass.transferSolDetails.publicKey
			} else {
				sendingTo = solanaClass.transferSolDetails.username
			}
			const sendingSolTransfer: SendingSolTransfer = {
				sendingTo,
				transferAmountSol: solanaClass.transferSolDetails.solAmount
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
			await retrieveWalletBalance()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, retrieveWalletBalance, solanaClass])

	return transferSol
}
