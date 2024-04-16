import { useCallback, useEffect } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useGetAuthDataFromStorageUseEffect(): void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()

	const getAuthDataFromStorage = useCallback((): void => {
		authClass.getAuthDataFromStorage()
		fortunaApiClient.httpClient.accessToken = authClass.accessToken
	}, [authClass, fortunaApiClient.httpClient])

	useEffect(() => {
		void getAuthDataFromStorage()
	} , [getAuthDataFromStorage])
}
