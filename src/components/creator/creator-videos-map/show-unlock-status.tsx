import { observer } from "mobx-react"
import { FaLock, FaUnlock } from "react-icons/fa"
import getTieredAccessPriceUsd from "../../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function ShowUnlockStatus(props: Props) {
	const { videoData } = props

	if (videoData.isUserAbleToAccessVideo === true) {
		return (
			<div className="flex flex-row items-center space-x-2">
				<div><FaUnlock /></div>
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
		<div className="flex flex-row items-center space-x-1.5">
			<div><FaLock className="mb-1"/></div>
			<div>
				{videoData.videoListingStatus === "SOLDOUT" ? (
					<>Sold Out</>
				) : (
					<>${getTieredAccessPriceUsd(videoData)} to unlock</>
				)}
			</div>
		</div>
	)
}

export default observer(ShowUnlockStatus)
