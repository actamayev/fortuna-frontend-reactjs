import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveWalletPublicKey(): (
	setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>

) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const retrieveWalletPublicKey = useCallback(async (
		setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (
				_.isNull(personalInfoClass) ||
				_.isNull(fortunaApiClient.httpClient.accessToken) ||
				!_.isNull(personalInfoClass.publicKey)
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
			personalInfoClass.publicKey = publicKeyResponse.data.publicKey

		} catch (error) {
			console.error(error)
		} finally {
			setIsButtonDisabled(false)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService, personalInfoClass])

	return retrieveWalletPublicKey
}
