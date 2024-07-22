import { useCallback } from "react"
import { FaClock } from "react-icons/fa"
import { useRelativeDateFormatter } from "../../hooks/date-formatter"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"
import BeneathDescriptionSection from "../creator/creator-videos-map/beneath-description-section"

interface Props {
	videoData: VideoDataWithUrlRetrievalStatus
}

export default function HomePageVideoInfo(props: Props) {
	const { videoData } = props
	const relativeDateFormatter = useRelativeDateFormatter()

	const navigateToCreatorPage = useNavigateToCreatorPage()

	const navigateToCreatorPageCallback = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		navigateToCreatorPage(addDefiniteLeadingAt(videoData.creatorUsername))
	}, [navigateToCreatorPage, videoData.creatorUsername])

	return (
		<div className="flex flex-col justify-start w-7/12 px-1.5">
			<div className="flex justify-between items-center">
				<div className="flex-1 min-w-0 text-sm font-semibold dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap">
					{videoData.videoName}
				</div>
				<div
					className="text-zinc-500 dark:text-zinc-400 flex-shrink-0"
					style={{ fontSize: "10px", lineHeight: "14px" }}
				>
					<div className="flex flex-row items-center">
						<FaClock className="mr-1" />
						{relativeDateFormatter(videoData.createdAt)}
					</div>
				</div>
			</div>
			<div className="flex items-center space-x-1 mt-0.5">
				<div className="flex-shrink-0">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={videoData.creatorProfilePictureUrl}
						onClickCreatorPicture={navigateToCreatorPageCallback}
						extraClasses="w-4 h-4 rounded-full object-cover cursor-pointer"
					/>
				</div>
				<div
					className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400
						hover:dark:text-zinc-50 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
					onClick={navigateToCreatorPageCallback}
					style={{ fontSize: "10px", lineHeight: "14px" }}
				>
					{videoData.channelName}
				</div>
			</div>
			<div className="mt-auto">
				<BeneathDescriptionSection
					videoData={videoData}
					extraStyles={{ fontSize: "10px", lineHeight: "14px" }}
				/>
			</div>
		</div>
	)
}
