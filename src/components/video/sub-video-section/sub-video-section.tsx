import { useCallback } from "react"
import LikeButton from "./like-button"
import VideoDescription from "./video-description"
import ShareVideoButton from "./share-video-button"
import { addDefiniteLeadingAt } from "../../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

interface Props {
	video: UrlExtendedSingleVideoData
}

export default function SubVideoSection(props: Props) {
	const { video } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()
	const { videoName, creatorProfilePictureUrl, creatorUsername, channelName } = video

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))
	}, [creatorUsername, navigateToCreatorPage])

	return (
		<div className="flex mx-0.5"> {/* This div will align its children side by side */}
			<div className="flex-1"> {/* Existing content takes up the space it needs */}
				<div className="text-lg font-medium mt-1">
					{videoName}
				</div>
				<div className="mt-0.5">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center">
							<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center mr-2">
								<ShowUserProfileImageOrDefaultImage
									profileImageUrl={creatorProfilePictureUrl}
									extraClasses="min-w-full min-h-full object-cover cursor-pointer"
									onClickCreatorPicture={navigateToCreatorPageCallback}
									onClickDefaultPicture={navigateToCreatorPageCallback}
								/>
							</div>
							<span
								className="text-sm font-medium cursor-pointer text-zinc-950 dark:text-zinc-200 hover:dark:text-zinc-50"
								onClick={navigateToCreatorPageCallback}
							>
								{channelName}
							</span>
						</div>
						<div className="flex items-center">
							<ShareVideoButton />
							<LikeButton video={video} />
						</div>
					</div>
					<VideoDescription video={video} />
				</div>
			</div>
		</div>
	)
}
