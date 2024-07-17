import _ from "lodash"
import { useCallback } from "react"
import { CredentialResponse } from "@react-oauth/google"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isErrorResponses } from "../../../utils/type-checks"
import { useVideoContext } from "../../../contexts/video-context"
import useSetDataAfterLoginOrRegister from "../set-data-after-login-or-register"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useGoogleAuthCallback(whereToNavigate: PageNames): (successResponse: CredentialResponse) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const videoClass = useVideoContext()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()

	return useCallback(async (successResponse: CredentialResponse) => {
		try {
			if (_.isUndefined(successResponse.credential) || _.isUndefined(successResponse.clientId)) return

			const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
			let siteTheme: SiteThemes = "light"
			if (siteThemeFromStorage === "dark") siteTheme = "dark"

			const googleCallbackResponse = await fortunaApiClient.authDataService.googleLoginCallback(
				successResponse.credential, siteTheme
			)
			if (!_.isEqual(googleCallbackResponse.status, 200) || isErrorResponses(googleCallbackResponse.data)) {
				throw Error("Unable to login")
			}
			setDataAfterLogin(googleCallbackResponse.data)
			videoClass.clearVideosOnLogin()
			if (googleCallbackResponse.data.isNewUser === true) {
				navigate("/register-username")
				return
			}
			navigate(whereToNavigate)
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.authDataService, navigate, setDataAfterLogin, videoClass, whereToNavigate])
}
