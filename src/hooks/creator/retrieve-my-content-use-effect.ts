import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useCreatorContext } from "../../contexts/creator-context"
import { isErrorResponse, isMessageResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyContentUseEffect(): void {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()

	// eslint-disable-next-line complexity
	const retrieveMyContent = useCallback(async () => {
		if (_.isNull(creatorClass)) return
		try {
			if (
				creatorClass.hasContentToRetrieve === false ||
				creatorClass.isRetrievingContent === true ||
				!_.isEmpty(creatorClass.myContent)
			) return
			creatorClass.setIsRetrievingContent(true)
			const myContentResponse = await fortunaApiClient.creatorDataService.retrieveMyContent()

			if (
				!_.isEqual(myContentResponse.status, 200) ||
				isMessageResponse(myContentResponse.data) ||
				isErrorResponse(myContentResponse.data)
			) return

			creatorClass.setContent(myContentResponse.data.creatorContentList)
			creatorClass.setHasContentToRetrieve(false)
		} catch (error) {
			console.error(error)
		} finally {
			creatorClass.setIsRetrievingContent(false)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService])

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyContent()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyContent])
}
