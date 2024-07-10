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
			className="grid grid-cols-12 items-start gap-4 p-4 rounded-lg cursor-pointer w-7/12
		bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToCreatorPageCallback}
		>
			<div className="col-span-4 flex items-center justify-center">
				<ShowUserProfileImageOrDefaultImage
					profileImageUrl={creatorData.creatorProfilePictureUrl}
					extraClasses="w-32 h-32 rounded-full object-cover"
				/>
			</div>
			<div className="col-span-8 flex flex-col text-start">
				<div className="text-zinc-950 dark:text-white text-2xl font-semibold break-words">
					{_.truncate(creatorData.channelName, { length: 50, omission: "..." })}
				</div>
				<div className="text-zinc-700 dark:text-zinc-300 text-base mt-1.5">
					@{creatorData.creatorUsername}
				</div>
				<div className="text-zinc-700 dark:text-zinc-300 text-base mt-1">
					{_.truncate(creatorData.channelDescription, { length: 150, omission: "..." })}
				</div>
			</div>
		</div>
	)
}
