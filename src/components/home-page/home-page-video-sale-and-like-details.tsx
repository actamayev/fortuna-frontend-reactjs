import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa"
import ShowUnlockStatus from "../creator/creator-videos-map/show-unlock-status"

interface Props {
	videoData: VideoDataWithUrlRetrievalStatus
}

function HomePageVideoSaleAndLikeDetails(props: Props) {
	const { videoData } = props

	const shouldShowNumberSold = useMemo(() => {
		if (
			videoData.isVideoExclusive === false ||
			_.isNull(videoData.numberOfExclusivePurchasesSoFar) ||
			videoData.numberOfExclusivePurchasesSoFar === 0
		) return false
		return true
	}, [videoData])

	return (
		<div
			className="flex flex-col justify-start overflow-hidden w-full mb-1 text-zinc-700 dark:text-zinc-300 text-xs font-semibold"
			style={{ fontSize: "10px", lineHeight: "14px" }}
		>
			<div className="flex flex-row items-center">
				<div>
					<ShowUnlockStatus videoData={videoData} />
				</div>
				{shouldShowNumberSold && (
					<div className="flex flex-row items-center space-x-1 ml-3">
						<div>
							<FaShoppingBag className="mb-0.5" />
						</div>
						<div>
							{videoData.numberOfExclusivePurchasesSoFar} Sold
						</div>
					</div>
				)}
				<div className="flex items-center ml-auto">
					{videoData.userLikeStatus === true ? (
						<FaHeart color="red" size={15} />
					) : (
						<FaRegHeart size={15} />
					)}
					{videoData.numberOfLikes > 0 && (
						<span className="ml-1">
							{videoData.numberOfLikes}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(HomePageVideoSaleAndLikeDetails)
