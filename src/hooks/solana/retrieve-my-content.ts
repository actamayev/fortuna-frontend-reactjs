import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useSolanaContext } from "../../contexts/solana-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyContent(): void {
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const retrieveMyContent = useCallback(async () => {
		try {
			if (
				_.isNull(solanaClass) ||
				solanaClass.hasContentToRetrieve === true ||
				!_.isEmpty(solanaClass.myContentMap)
			) {
				return
			}
			const myContent = await fortunaApiClient.solanaDataService.retrieveMyContent()
			if (!_.isEqual(myContent.status, 200) || isMessageResponse(myContent.data) || isErrorResponse(myContent.data)) {
				return
			}

			solanaClass.addContent(myContent)
			solanaClass.hasContentToRetrieve = false
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.solanaDataService, solanaClass])

	useEffect(() => {
		void retrieveMyContent()
	}, [retrieveMyContent, solanaClass])
}
