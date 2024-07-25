import { observer } from "mobx-react"
import { FaLock, FaUnlock } from "react-icons/fa"
import Tooltip from "../tooltip"

interface Props {
	isUserAbleToAccessVideo: boolean
	index: number
}

function ShowRecentUploadsLockStatus(props: Props) {
	const { isUserAbleToAccessVideo, index } = props

	const isRightMostVideo = ((index  + 1) % 5) === 0
	if (isUserAbleToAccessVideo === true) {
		return (
			<Tooltip
				message="You have access to this video"
				width="215px"
				messageStart={isRightMostVideo ? "left" : "center"}
			>
				<div
					className="flex flex-row items-center space-x-1"
					style={{
						fontSize: "10px",
						lineHeight: "14px"
					}}
				>
					<div>Unlocked</div>
					<FaUnlock />
				</div>
			</Tooltip>
		)
	}

	return (
		<Tooltip
			message="You have not purchased access to this exclusive video"
			width="250px"
			messageStart={isRightMostVideo ? "left" : "center"}
		>
			<div
				className="flex flex-row items-center space-x-1"
				style={{
					fontSize: "10px",
					lineHeight: "14px"
				}}
			>
				<div>Locked</div>
				<FaLock size={12}/>
			</div>
		</Tooltip>
	)
}

export default observer(ShowRecentUploadsLockStatus)
