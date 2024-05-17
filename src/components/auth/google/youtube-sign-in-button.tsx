import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../button"
import useYouTubeLogin from "../../../hooks/youtube/youtube-login"
import { useYouTubeContext } from "../../../contexts/youtube-context"

function YouTubeSignInButton() {
	const youtubeClass = useYouTubeContext()
	const youtubeLogin = useYouTubeLogin()

	if (_.isNull(youtubeClass) || youtubeClass.hasYouTubeAccessTokens === true) return null

	return (
		<Button
			title="YouTube sign-in"
			onClick={youtubeLogin}
			colorClass="bg-red-300"
			hoverClass="hover:bg-red-400"
			className="font-semibold"
		/>
	)
}

export default observer(YouTubeSignInButton)
