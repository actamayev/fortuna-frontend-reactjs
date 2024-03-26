import _ from "lodash"
import { useNavigate } from "react-router-dom"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import { useCallback } from "react"

export default function useLoginSubmit (
	loginInformation: LoginCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()
	const navigate = useNavigate()

	const loginSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			const response = await fortunaApiClient.authDataService.login(loginInformation)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to login. Please reload and try again.")
				return
			}
			setDataAfterLogin(response.data.accessToken)
			navigate("/dashboard")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to login")
		} finally {
			setLoading(false)
		}
	}, [fortunaApiClient.authDataService, loginInformation, navigate, setDataAfterLogin, setError, setLoading])

	return loginSubmit
}
