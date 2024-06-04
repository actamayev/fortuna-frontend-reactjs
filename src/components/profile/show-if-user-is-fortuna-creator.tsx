import _ from "lodash"
import { observer } from "mobx-react"
import { useYouTubeContext } from "../../contexts/youtube-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowIfUserIsFortunaCreator() {
	const personalInfoClass = usePersonalInfoContext()
	const youtubeClass = useYouTubeContext()

	if (_.isNull(personalInfoClass) || _.isNull(youtubeClass)) return null

	if (personalInfoClass.isApprovedToBeCreator === true) {
		return (
			<div className="dark:text-zinc-200">
				<div>
					You are approved to be a creator on Fortuna.
				</div>
				<div>
					You have {youtubeClass.subscriberCount} YouTube subscribers
				</div>
			</div>
		)
	}
	if (youtubeClass.hasYouTubeAccessTokens !== true) {
		return (
			<div className="dark:text-zinc-200">
				<div>
					You are not approved to be a creator on Fortuna.
				</div>
				<div>
					Please connect your YouTube account (above) to see if you qualify to be a Fortuna creator
				</div>
			</div>
		)
	}
	return (
		<div className="dark:text-zinc-200">
			<div>
				You are not approved to be a creator on Fortuna.
			</div>
			<div>
				You have {youtubeClass.subscriberCount} YouTube subscribers
			</div>
		</div>
	)
}

export default observer(ShowIfUserIsFortunaCreator)
