import _ from "lodash"
import { useCallback } from "react"
import { CredentialResponse } from "@react-oauth/google"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isErrorResponses } from "../../../utils/type-checks"
import useSetDataAfterLoginOrRegister from "../set-data-after-login-or-register"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useGoogleAuthCallback(): (successResponse: CredentialResponse) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()

	const googleAuthCallback = useCallback(async (successResponse: CredentialResponse) => {
		try {
			if (_.isUndefined(successResponse.credential) || _.isUndefined(successResponse.clientId)) return
			const googleCallbackResponse = await fortunaApiClient.authDataService.googleLoginCallback(
				successResponse.credential
			)
			if (!_.isEqual(googleCallbackResponse.status, 200) || isErrorResponses(googleCallbackResponse.data)) {
				throw Error("Unable to login")
			}
			setDataAfterLogin(googleCallbackResponse.data.accessToken)
			if (googleCallbackResponse.data.isNewUser === true) {
				navigate("/register-username")
				return
			}
			navigate("/my-ownership")
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.authDataService, navigate, setDataAfterLogin])

	return googleAuthCallback
}
