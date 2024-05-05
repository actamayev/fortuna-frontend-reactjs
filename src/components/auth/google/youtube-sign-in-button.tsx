import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../button"
import useYoutubeLogin from "../../../hooks/google/youtube-login"
import { useYoutTubeContext } from "../../../contexts/youtube-context"

function YoutubeSignInButton() {
	const youTubeClass = useYoutTubeContext()
	const youTubeLogin = useYoutubeLogin()

	if (_.isNull(youTubeClass) || youTubeClass.hasYouTubeAccessTokens === true) return null

	return (
		<Button
			title="YouTube sign-in"
			onClick={youTubeLogin}
			colorClass="bg-red-300"
			hoverClass="hover:bg-red-400"
		/>
	)
}

export default observer(YoutubeSignInButton)
