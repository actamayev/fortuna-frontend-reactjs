import _ from "lodash"
import { useCallback } from "react"
import useLogout from "./logout"
import { isErrorResponse } from "../../utils/type-checks"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useHandleLogout(
	setLogoutDisabled: React.Dispatch<React.SetStateAction<boolean>>
): (
	e: React.MouseEvent<HTMLButtonElement>
) => void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()
	const logout = useLogout()

	const handleLogout = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			setLogoutDisabled(true)
			authClass.setIsLoggingOut(true)
			const response = await fortunaApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			logout()
			authClass.setIsLoggingOut(false)
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}, [authClass, fortunaApiClient.authDataService, logout, setLogoutDisabled])

	return handleLogout
}
