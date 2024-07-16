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
			className="rounded-lg cursor-pointer w-2/3 bg-zinc-100 dark:bg-zinc-800 border
			border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToCreatorPageCallback}
		>
			<div className="flex w-full">
				<div className="w-5/12 flex items-center justify-center my-2">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={creatorData.creatorProfilePictureUrl}
						extraClasses="w-32 h-32 rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-start w-7/12 px-3 my-1.5">
					<div className="text-zinc-950 dark:text-white text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
						{creatorData.channelName}
					</div>
					<div className="flex flex-row">
						<div
							className="text-zinc-500 dark:text-zinc-400 text-xs break-words mt-1.5
						overflow-hidden text-ellipsis whitespace-nowrap"
						>
							@{creatorData.creatorUsername}&nbsp;
						</div>
						<div
							className="text-zinc-500 dark:text-zinc-400 text-xs break-words mt-1.5
						overflow-hidden text-ellipsis whitespace-nowrap"
						>
							• {creatorData.numberOfVideos} video{creatorData.numberOfVideos === 1 ? "" : "s"}
						</div>
					</div>
					<div className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 break-words">
						{_.truncate(creatorData.channelDescription, { length: 150 })}
					</div>
				</div>
			</div>
		</div>
	)
}
