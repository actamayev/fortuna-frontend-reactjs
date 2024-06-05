import _ from "lodash"
import { useEffect } from "react"
import useRetrieveMyPurchasedExclusiveContent from "./retrieve-my-purchased-exclusive-content"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyPurchasedExclusiveContentUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const retrieveMyOwnership = useRetrieveMyPurchasedExclusiveContent()

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyOwnership()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyOwnership])
}
