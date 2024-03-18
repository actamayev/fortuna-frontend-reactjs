import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fiftyone-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const authClass = useAuthContext()
	const eventfullApiClient = useApiClientContext()

	const getAuthDataFromStorage = (): void => {
		authClass.getAuthDataFromStorage()
		eventfullApiClient.httpClient.accessToken = authClass.accessToken
	}

	return getAuthDataFromStorage
}
