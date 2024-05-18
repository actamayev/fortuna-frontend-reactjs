import _ from "lodash"
import { useCallback } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveWalletPublicKey(): (
	setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>

) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const retrieveWalletPublicKey = useCallback(async (
		setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				!_.isNull(solanaClass.walletPublicKey)
			) return
			setIsButtonDisabled(true)

			const publicKeyResponse = await fortunaApiClient.personalInfoDataService.retrieveWalletPublicKey()
			if (
				!_.isEqual(publicKeyResponse.status, 200) ||
				isMessageResponse(publicKeyResponse.data) ||
				isErrorResponse(publicKeyResponse.data)
			) {
				throw Error("Unable to retrieve public key")
			}
			solanaClass.walletPublicKey = publicKeyResponse.data.publicKey
		} catch (error) {
			console.error(error)
		} finally {
			setIsButtonDisabled(false)
		}
	}, [solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService])

	return retrieveWalletPublicKey
}
