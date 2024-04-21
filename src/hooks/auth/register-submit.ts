import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (
	whereToNavigate: PageNames,
	registerCredentials: RegisterCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const setDataAfterRegister = useSetDataAfterLoginOrRegister()

	const loginSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...restOfCredentials } = registerCredentials

			const response = await fortunaApiClient.authDataService.register(restOfCredentials)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload and try again.")
				return
			}
			setDataAfterRegister(response.data.accessToken)
			navigate(whereToNavigate)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to Register")
		} finally {
			setLoading(false)
		}
	}, [fortunaApiClient.authDataService, navigate, registerCredentials, setDataAfterRegister, setError, setLoading, whereToNavigate])

	return loginSubmit
}
