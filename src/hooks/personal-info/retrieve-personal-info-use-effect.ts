import _ from "lodash"
import { PublicKey } from "@solana/web3.js"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrievePersonalInfoUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	const retrievePersonalInfo = useCallback(async () => {
		try {
			if (
				_.isNull(personalInfoClass) ||
				_.isNull(solanaClass) ||
				personalInfoClass.isRetrievingPersonalInfo === true ||
				_.isNull(fortunaApiClient.httpClient.accessToken)
			) return

			personalInfoClass.setIsRetrievingPersonalDetails(true)

			const personalInfoResponse = await fortunaApiClient.personalInfoDataService.retrievePersonalInfo()
			if (!_.isEqual(personalInfoResponse.status, 200) || isErrorResponse(personalInfoResponse.data)) {
				throw Error ("Unable to retrieve personal info")
			}
			personalInfoClass.setRetrievedPersonalData(personalInfoResponse.data)
			solanaClass.setWalletPublicKey(new PublicKey(personalInfoResponse.data.publicKey))
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(personalInfoClass)) personalInfoClass.setIsRetrievingPersonalDetails(false)
		}
	}, [personalInfoClass, solanaClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService])

	useEffect(() => {
		void retrievePersonalInfo()
	}, [retrievePersonalInfo])
}
