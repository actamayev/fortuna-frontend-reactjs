import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (
	accessToken: string,
) => void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()

	const handleSetDataAfterLoginOrRegister = (
		accessToken: string,
	): void => {
		fortunaApiClient.httpClient.accessToken = accessToken
		authClass.setAccessToken(accessToken)
	}

	return handleSetDataAfterLoginOrRegister
}
