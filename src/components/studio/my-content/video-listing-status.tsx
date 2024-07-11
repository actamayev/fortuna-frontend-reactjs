import { observer } from "mobx-react"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import Tooltip from "../../tooltip"
import capitalizeFirstLetter from "../../../utils/capitalize-first-letter"

interface Props {
	content: MyContent
}

function VideoListingStatus(props: Props) {
	const { content } = props

	if (content.isContentExclusive === true) {
		return (
			<>
				<FaEye color="green" size={20} />
				<div className="mx-2">Listed</div>
				<Tooltip
					message="Unable to change listing status since this is an exclusive video"
					messageStart="center"
					width="250px"
				>
					<FaLock />
				</Tooltip>
			</>
		)
	}

	return (
		<>
			{content.videoListingStatus === "UNLISTED" ? (
				<FaEyeSlash size={20} />
			) : (
				<FaEye color="green" size={20} />
			)}
			<div className="ml-2">
				{capitalizeFirstLetter(content.videoListingStatus)}
			</div>
		</>
	)
}

export default observer(VideoListingStatus)
