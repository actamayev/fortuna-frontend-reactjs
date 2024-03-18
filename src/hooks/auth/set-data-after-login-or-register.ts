import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fiftyone-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (
	accessToken: string,
) => void {
	const authClass = useAuthContext()
	const eventfullApiClient = useApiClientContext()

	const handleSetDataAfterLoginOrRegister = (
		accessToken: string,
	): void => {
		eventfullApiClient.httpClient.accessToken = accessToken
		authClass.setAccessToken(accessToken)
	}

	return handleSetDataAfterLoginOrRegister
}
