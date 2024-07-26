import { useCallback } from "react"
import CreatorDataRightOfImage from "./creator-data-right-of-image"
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
			className="rounded-lg cursor-pointer w-2/3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToCreatorPageCallback}
		>
			<div className="flex w-full">
				<div className="w-5/12 flex items-center justify-center my-2">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={creatorData.creatorProfilePictureUrl}
						extraClasses="w-32 h-32 rounded-full object-cover"
						onClickCreatorPicture={navigateToCreatorPageCallback}
					/>
				</div>
				<CreatorDataRightOfImage creatorData={creatorData} />
			</div>
		</div>
	)
}
