import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyOwnership(): void {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	// eslint-disable-next-line complexity
	const retrieveMyOwnership = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				solanaClass.hasOwnershipToRetrieve === false ||
				solanaClass.isRetrievingOwnership === true ||
				!_.isEmpty(solanaClass.myOwnershipMap)
			) return
			solanaClass.setIsRetrievingOwnership(true)
			const myOwnershipResponse = await fortunaApiClient.solanaDataService.retrieveMyOwnership()

			if (
				!_.isEqual(myOwnershipResponse.status, 200) ||
				isMessageResponse(myOwnershipResponse.data) ||
				isErrorResponse(myOwnershipResponse.data)
			) return

			solanaClass.setMyOwnership(myOwnershipResponse.data.myOwnership)
			solanaClass.setHasOwnershipToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingOwnership(false)
		}
	}, [fortunaApiClient.solanaDataService, solanaClass])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyOwnership()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyOwnership])
}
