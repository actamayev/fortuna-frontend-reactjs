import PriceToAccessArea from "../home-page/price-to-access-area"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"

interface Props {
	video: SingleVideoDataFromBackend
}

export default function VideoDescriptionArea(props: Props) {
	const { video } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()

	const {
		videoName,
		creatorProfilePictureUrl,
		creatorUsername,
		description
	} = video

	return (
		<div className="flex"> {/* This div will align its children side by side */}
			<div className="flex-1"> {/* Existing content takes up the space it needs */}
				<div className="text-2xl font-semibold">
					{videoName}
				</div>
				<div className="flex items-center">
					{creatorProfilePictureUrl && (
						<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center mr-2">
							<img
								src={creatorProfilePictureUrl}
								alt="Creator's Profile"
								className="min-w-full min-h-full object-cover cursor-pointer"
								onClick={() => navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))}
							/>
						</div>
					)}
					<span
						className="text-sm font-medium cursor-pointer hover:font-semibold"
						onClick={() => navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))}
					>
						{creatorUsername}
					</span>
				</div>
				<div>
					{description}
				</div>
				<div>
					<PriceToAccessArea video={video}/>
				</div>
			</div>
		</div>
	)
}
