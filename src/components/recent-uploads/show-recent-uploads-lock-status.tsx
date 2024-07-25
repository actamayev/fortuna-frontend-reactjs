import { observer } from "mobx-react"
import { FaLock, FaUnlock } from "react-icons/fa"
import Tooltip from "../tooltip"

interface Props {
	isUserAbleToAccessVideo: boolean
	index: number
}

function ShowRecentUploadsLockStatus(props: Props) {
	const { isUserAbleToAccessVideo, index } = props

	const isRightMostVideo = ((index  + 1) % 4) === 0
	if (isUserAbleToAccessVideo === true) {
		return (
			<Tooltip
				message="You have access to this video"
				width="215px"
				messageStart={isRightMostVideo ? "left" : "center"}
			>
				<FaUnlock />
			</Tooltip>
		)
	}

	return (
		<Tooltip
			message="You have not purchased access to this exclusive video"
			width="250px"
			messageStart={isRightMostVideo ? "left" : "center"}
		>
			<FaLock />
		</Tooltip>
	)
}

export default observer(ShowRecentUploadsLockStatus)
