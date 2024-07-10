import { observer } from "mobx-react"

interface Props {
	content: MyContent
}

function LikesDislikesRatioSection(props: Props) {
	const { content } = props

	if (content.numberOfLikes === 0) {
		return (
			<div>
				0 likes
				Progress bar (half full)
			</div>
		)
	}

	let likePercentage
	if (content.numberOfDislikes === 0) likePercentage = 100
	else likePercentage = (content.numberOfLikes / content.numberOfDislikes)

	return (
		<div>
			{likePercentage}%
			{content.numberOfLikes} like{content.numberOfLikes === 1 ? "" : "s"}
		</div>
	)
}

export default observer(LikesDislikesRatioSection)
