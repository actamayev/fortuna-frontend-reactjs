import { useGoogleLogin } from "@react-oauth/google"
import Button from "../../button"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function GoogleSignIn() {
	const fortunaApiClient = useApiClientContext()
	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async ({ code }) => {
			try {
				await fortunaApiClient.authDataService.googleLoginCallback(code)
			} catch (error) {
				console.error(error)
			}
		},
		scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly"
	})

	return (
		<Button
			title="Google Login"
			onClick={googleLogin}
			colorClass="bg-blue-300"
			hoverClass="hover:bg-blue-400"
		/>
	)
}
