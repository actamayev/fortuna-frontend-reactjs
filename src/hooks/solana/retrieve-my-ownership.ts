import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyOwnership(): void {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyOwnership = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				_.isNil(personalInfoClass?.username) ||
				solanaClass.hasOwnershipToRetrieve === false ||
				solanaClass.isRetrievingOwnership === true ||
				!_.isEmpty(solanaClass.myOwnership)
			) return
			solanaClass.setIsRetrievingOwnership(true)
			const myOwnershipResponse = await fortunaApiClient.solanaDataService.retrieveMyOwnership()

			if (
				!_.isEqual(myOwnershipResponse.status, 200) ||
				isMessageResponse(myOwnershipResponse.data) ||
				isErrorResponse(myOwnershipResponse.data)
			) return

			solanaClass.setMyOwnership(myOwnershipResponse.data.myOwnershipList)
			solanaClass.setHasOwnershipToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingOwnership(false)
		}
	}, [fortunaApiClient.solanaDataService, personalInfoClass?.username, solanaClass])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyOwnership()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyOwnership])
}
