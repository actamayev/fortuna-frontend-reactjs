import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyContent(): void {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

	// eslint-disable-next-line complexity
	const retrieveMyContent = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				personalInfoClass?.isApprovedToBeCreator !== true ||
				solanaClass.hasContentToRetrieve === false ||
				solanaClass.isRetrievingContent === true ||
				!_.isEmpty(solanaClass.myContent)
			) return
			solanaClass.setIsRetrievingContent(true)
			const myContentResponse = await fortunaApiClient.solanaDataService.retrieveMyContent()

			if (
				!_.isEqual(myContentResponse.status, 200) ||
				isMessageResponse(myContentResponse.data) ||
				isErrorResponse(myContentResponse.data)
			) return

			solanaClass.setContent(myContentResponse.data.creatorContentList)
			solanaClass.setHasContentToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsRetrievingContent(false)
		}
	}, [fortunaApiClient.solanaDataService, personalInfoClass?.isApprovedToBeCreator, solanaClass])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyContent()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyContent])
}
