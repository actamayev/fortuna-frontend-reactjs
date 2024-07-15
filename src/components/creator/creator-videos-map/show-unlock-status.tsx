import { observer } from "mobx-react"
import { FaUnlock } from "react-icons/fa"
import getTieredAccessPriceUsd from "../../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function ShowUnlockStatus(props: Props) {
	const { videoData } = props

	if (videoData.isUserAbleToAccessVideo === true) {
		return (
			<div className="flex flex-row space-x-2">
				<FaUnlock />
				<div>
					{videoData.isVideoExclusive === false && (
						<>Non exclusive </>
					)}
					{videoData.isVideoExclusive === true && (
						<>Unlocked </>
					)}
				</div>
			</div>
		)
	}

	return (
		<div>
			${getTieredAccessPriceUsd(videoData)} to unlock
		</div>
	)
}

export default observer(ShowUnlockStatus)
