import _ from "lodash"
import { useCallback } from "react"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"

interface Props {
	creatorData: CreatorData
}

export default function SingleCreatorSearchItem(props: Props) {
	const { creatorData } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorData.creatorUsername))
	}, [creatorData.creatorUsername, navigateToCreatorPage])

	return (
		<div
			className="flex items-start space-x-4 p-4 rounded-lg cursor-pointer w-7/12
			bg-zinc-100 dark:bg-zinc-800  border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToCreatorPageCallback}
		>
			<ShowUserProfileImageOrDefaultImage
				profileImageUrl={creatorData.creatorProfilePictureUrl}
				extraClasses="w-32 h-32 rounded-full object-cover"
			/>
			<div className="flex flex-col text-start">
				<div className="text-zinc-950 dark:text-zinc-100 text-lg font-semibold">
					{creatorData.channelName}
				</div>
				<div className="text-zinc-700 dark:text-zinc-300 text-sm mt-1.5">
					@{creatorData.creatorUsername}
				</div>
				<div className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">
					{_.truncate(creatorData.channelDescription, { length: 90, omission: "..."})}
				</div>
			</div>
		</div>
	)
}
