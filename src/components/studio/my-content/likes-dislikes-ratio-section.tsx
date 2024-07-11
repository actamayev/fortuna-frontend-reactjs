import { observer } from "mobx-react"

interface Props {
	content: MyContent
}

function LikesDislikesRatioSection(props: Props) {
	const { content } = props

	let likePercentage: number | string = 0

	if (content.numberOfLikes === 0 && content.numberOfDislikes === 0) {
		return (
			<div className="flex flex-col items-start">
				<div className="text-sm text-zinc-600 dark:text-zinc-300">
					No likes/dislikes
				</div>
			</div>
		)
	}

	if (content.numberOfLikes === 0) likePercentage = 0
	else if (content.numberOfDislikes === 0) likePercentage = 100
	else {
		likePercentage = ((content.numberOfLikes / (content.numberOfLikes + content.numberOfDislikes)) * 100).toFixed(1)
	}

	return (
		<div className="flex flex-col items-start space-y-5">
			<div className="text-sm text-zinc-600 dark:text-zinc-300">
				{likePercentage}%
			</div>
			<div className="text-sm text-zinc-600 dark:text-zinc-300">
				{content.numberOfLikes} like{content.numberOfLikes !== 1 && "s"}
			</div>
			{content.numberOfLikes > 0 || content.numberOfDislikes > 0 ? (
				<div className="w-5/6 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
					<div
						className="bg-blue-500 h-1.5 rounded-full"
						style={{ width: `${likePercentage}%` }}
					></div>
				</div>
			) : null}
		</div>
	)
}

export default observer(LikesDislikesRatioSection)
