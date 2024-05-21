import _ from "lodash"
import { useEffect } from "react"
import useRetrieveMyOwnership from "./retrieve-my-ownership"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useRetrieveMyOwnershipUseEffect(): void {
	const fortunaApiClient = useApiClientContext()
	const retrieveMyOwnership = useRetrieveMyOwnership()

	useEffect(() => {
		if (_.isNull(fortunaApiClient.httpClient.accessToken)) return
		void retrieveMyOwnership()
	}, [fortunaApiClient.httpClient.accessToken, retrieveMyOwnership])
}
