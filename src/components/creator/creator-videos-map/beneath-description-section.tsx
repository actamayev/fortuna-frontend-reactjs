import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa"
import ShowUnlockStatus from "./show-unlock-status"

interface Props {
	videoData: VideoDataWithUrlRetrievalStatus
	extraStyles?: Object
}

function BeneathDescriptionSection(props: Props) {
	const { videoData, extraStyles } = props

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
			className="flex flex-col justify-start overflow-hidden w-full my-2 text-zinc-700 dark:text-zinc-300 text-xs font-semibold"
			style={extraStyles}
		>
			<div className="flex flex-row items-center">
				<div>
					<ShowUnlockStatus videoData={videoData} />
				</div>
				{shouldShowNumberSold && (
					<div className="flex flex-row items-center space-x-1.5 mx-4">
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
						<span className="ml-1.5">
							{videoData.numberOfLikes}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(BeneathDescriptionSection)
