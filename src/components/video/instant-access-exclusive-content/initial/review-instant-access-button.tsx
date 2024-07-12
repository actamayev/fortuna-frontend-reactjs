import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../../../buttons/button"
import useClickTiersButton from "../../../../hooks/market/click-tiers-button"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"
import useCheckIfUUIDExistsInExclusiveContentList
	from "../../../../hooks/positions-and-transactions/check-if-uuid-exists-in-exclusive-content-list"

interface Props {
	video: SingleVideoDataFromBackend
}

function ReviewInstantAccessButton(props: Props) {
	const { video } = props
	const clickTiersButton = useClickTiersButton(video)
	const doesUserHaveAccessToExclusiveContent = useCheckIfUUIDExistsInExclusiveContentList(video.uuid)
	const accessPrice = getTieredAccessPriceUsd(video)

	if (doesUserHaveAccessToExclusiveContent === true) {
		return (
			<div className="flex justify-center items-center text-center font-semibold w-full">
				You already purchased access to this exclusive video
			</div>
		)
	}

	if (video.videoListingStatus === "SOLDOUT" || _.isNull(accessPrice)) {
		return (
			<div className="flex justify-center items-center text-center font-semibold w-full">
				Sold Out
			</div>
		)
	}

	return (
		<div className="text-center font-semibold flex justify-center items-center">
			<Button
				title={`Unlock Instant Access for $${accessPrice}`}
				colorClass="bg-blue-300 dark:bg-blue-400"
				hoverClass="hover:bg-blue-400 dark:hover:bg-blue-500"
				className={"font-semibold text-zinc-950 cursor-pointer"}
				onClick={clickTiersButton}
			/>
		</div>
	)
}

export default observer(ReviewInstantAccessButton)
