import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()

	const getAuthDataFromStorage = (): void => {
		authClass.getAuthDataFromStorage()
		fortunaApiClient.httpClient.accessToken = authClass.accessToken
	}

	return getAuthDataFromStorage
}
