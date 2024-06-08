import _ from "lodash"
import { observer } from "mobx-react"
import { useYouTubeContext } from "../../contexts/youtube-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ShowYoutubeSubscribers() {
	const personalInfoClass = usePersonalInfoContext()
	const youtubeClass = useYouTubeContext()

	if (_.isNull(personalInfoClass) || _.isNull(youtubeClass)) return null

	return (
		<div className="dark:text-zinc-200">
			<div>
				You have {youtubeClass.subscriberCount} YouTube subscribers
			</div>
		</div>
	)
}

export default observer(ShowYoutubeSubscribers)
