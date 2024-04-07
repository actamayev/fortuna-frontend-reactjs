import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useTransferSol(): (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()

	const transferSol = useCallback(async (
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			if (_.isNull(solanaClass) || _.isNull(fortunaApiClient.httpClient.accessToken)) return
			// Confirm amount sending is less than the amount the user has in teh account.
			setIsLoading(true)
			let sendingTo
			if (solanaClass.transferSolDetails.transferOption === "publicKey") {
				sendingTo = solanaClass.transferSolDetails.publicKey
			} else {
				sendingTo = solanaClass.transferSolDetails.username
			}
			const sendingSolTransfer: SendingSolTransfer = {
				sendingTo,
				sendingToPublicKeyOrUsername: solanaClass.transferSolDetails.transferOption,
				transferAmountSol: solanaClass.transferSolDetails.solAmount
			}
			const transferSolResponse = await fortunaApiClient.solanaDataService.transferSol(sendingSolTransfer)
			if (!_.isEqual(transferSolResponse, 200) || isNonSuccessResponse(transferSolResponse)) {
				throw Error("Error transferring sol")
			}
			solanaClass.setIsTransferSolButtonPressed(false)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.solanaDataService, solanaClass])

	return transferSol
}
