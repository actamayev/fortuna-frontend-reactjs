import _ from "lodash"
import { useCallback } from "react"
import useLogout from "./logout"
import { isErrorResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useHandleLogout(
	setLogoutDisabled: React.Dispatch<React.SetStateAction<boolean>>
): (
	e: React.MouseEvent<HTMLButtonElement>
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const logout = useLogout()

	return useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			setLogoutDisabled(true)
			const response = await fortunaApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			logout()
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}, [fortunaApiClient.authDataService, logout, setLogoutDisabled])
}
