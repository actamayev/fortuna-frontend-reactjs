import _ from "lodash"
import { useCallback } from "react"
import { FaUserCircle } from "react-icons/fa"
import ShareVideoButton from "./like-dislike/share-video-button"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import VideoLikeDislikeSection from "./like-dislike/video-like-dislike-section"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"

interface Props {
	video: SingleVideoDataFromBackend
}

export default function SubVideoSection(props: Props) {
	const { video } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()
	const { videoName, creatorProfilePictureUrl, creatorUsername, description } = video

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))
	}, [creatorUsername, navigateToCreatorPage])

	return (
		<div className="flex mx-0.5"> {/* This div will align its children side by side */}
			<div className="flex-1"> {/* Existing content takes up the space it needs */}
				<div className="text-2xl font-semibold mt-1">
					{videoName}
				</div>
				<div className="mt-0.5">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center">
							<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center mr-2">
								{_.isNull(creatorProfilePictureUrl) ? (
									<FaUserCircle
										className="min-w-full min-h-full object-cover cursor-pointer"
										onClick={navigateToCreatorPageCallback}
									/>
								) : (
									<img
										src={creatorProfilePictureUrl}
										alt="Creator's Profile"
										className="min-w-full min-h-full object-cover cursor-pointer"
										onClick={navigateToCreatorPageCallback}
									/>
								)}
							</div>
							<span
								className="text-sm font-medium cursor-pointer text-zinc-950 dark:text-zinc-200 hover:dark:text-zinc-50"
								onClick={navigateToCreatorPageCallback}
							>
								{creatorUsername}
							</span>
						</div>
						<div className="flex items-center">
							<ShareVideoButton />
							<VideoLikeDislikeSection video={video} />
						</div>
					</div>
					<div className="bg-zinc-100 dark:bg-zinc-700 rounded-md p-2 dark:text-white">
						{description}
					</div>
				</div>
			</div>
		</div>
	)
}
