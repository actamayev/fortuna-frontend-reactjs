import _ from "lodash"
import { useGoogleLogin } from "@react-oauth/google"
import { useYoutTubeContext } from "../../contexts/youtube-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"
import { isNonSuccessResponse } from "../../utils/type-checks"

export default function useYoutubeLogin(): () => void {
	const fortunaApiClient = useApiClientContext()
	const youTubeClass = useYoutTubeContext()

	const youTubeLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async ({ code }) => {
			try {
				if (_.isNull(youTubeClass)) return
				const response = await fortunaApiClient.authDataService.googleYoutubeCallback(code)
				if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
					throw Error("Unable to Login with YouTube")
				}
				youTubeClass.hasYouTubeAccessTokens = true
			} catch (error) {
				console.error(error)
			}
		},
		scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly"
	})

	return youTubeLogin
}
