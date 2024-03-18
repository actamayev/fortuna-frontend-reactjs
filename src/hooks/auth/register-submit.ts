import _ from "lodash"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"
import { useApiClientContext } from "../../contexts/fiftyone-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (
	registerCredentials: RegisterCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const authClass = useAuthContext()
	const fiftyoneApiClient = useApiClientContext()
	const navigate = useNavigate()

	const loginSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...restOfCredentials } = registerCredentials

			const response = await fiftyoneApiClient.authDataService.register(restOfCredentials)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to login. Please reload and try again.")
				return
			}
			authClass.setAccessToken(response.data.accessToken)
			navigate("/dashboard")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to login")
		} finally {
			setLoading(false)
		}
	}

	return loginSubmit
}
