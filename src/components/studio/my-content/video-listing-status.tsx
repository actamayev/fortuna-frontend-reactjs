import { observer } from "mobx-react"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import Tooltip from "../../tooltip"
import capitalizeFirstLetter from "../../../utils/capitalize-first-letter"

interface Props {
	content: MyContent
	toggleModalOpen: () => void
}

function VideoListingStatus(props: Props) {
	const { content, toggleModalOpen } = props

	if (content.isContentExclusive === true) {
		return (
			<div
				className="mt-1.5 text-sm dark:text-white text-black text-center \
					rounded-md px-1 py-0.5 cursor-pointer inline-flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-700"
				onClick={toggleModalOpen}
			>
				<FaEye color="green" size={20} className="mr-1"/>
				Listed
				<div className="ml-1 flex items-center">
					<Tooltip
						message="Unable to change listing status since this is an exclusive video"
						messageStart="center"
						width="250px"
					>
						<FaLock />
					</Tooltip>
				</div>
			</div>
		)
	}

	return (
		<div
			className="mt-1.5 text-sm dark:text-white text-black text-center \
				rounded-md px-1 py-0.5 cursor-pointer inline-flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={toggleModalOpen}
		>
			{content.videoListingStatus === "UNLISTED" ? (
				<FaEyeSlash size={20} className="mr-1"/>
			) : (
				<FaEye color="green" size={20} className="mr-1"/>
			)}
			{capitalizeFirstLetter(content.videoListingStatus)}
		</div>
	)
}

export default observer(VideoListingStatus)
