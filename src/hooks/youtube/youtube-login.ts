import _ from "lodash"
import { useGoogleLogin } from "@react-oauth/google"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useYouTubeContext } from "../../contexts/youtube-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useYouTubeLogin(): () => void {
	const fortunaApiClient = useApiClientContext()
	const youtubeClass = useYouTubeContext()
	const personalInfoClass = usePersonalInfoContext()

	const youtubeLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async ({ code }) => {
			try {
				if (_.isNull(youtubeClass) || _.isNull(personalInfoClass)) return
				const response = await fortunaApiClient.authDataService.youtubeCallback(code)
				if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
					throw Error("Unable to Login with YouTube")
				}
				youtubeClass.setYouTubeClassData(response.data)
				personalInfoClass.isApprovedToBeCreator = response.data.isApprovedToBeCreator
			} catch (error) {
				console.error(error)
			}
		},
		scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly"
	})

	return youtubeLogin
}
