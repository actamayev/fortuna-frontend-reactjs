import { observer } from "mobx-react"
import { GoogleLogin } from "@react-oauth/google"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useGoogleAuthCallback from "../../../hooks/auth/google/google-auth-callback"

interface Props {
	whereToNavigate: PageNames
}

function GoogleSignIn(props: Props) {
	const { whereToNavigate } = props
	const personalInfoClass = usePersonalInfoContext()
	const googleAuthCallback = useGoogleAuthCallback(whereToNavigate)

	return (
		<div className="flex justify-center">
			<GoogleLogin
				onSuccess={googleAuthCallback}
				onError={() => console.error("Login Failed")}
				shape="rectangular"
				width={200}
				theme={personalInfoClass?.defaultSiteTheme === "dark" ? "outline" : "filled_black"}
				text="continue_with"
				logo_alignment="center"
			/>
		</div>
	)
}

export default observer(GoogleSignIn)
