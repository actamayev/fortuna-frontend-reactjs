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

	if (doesUserHaveAccessToExclusiveContent === true) {
		return (
			<div className="flex items-center w-full">
				<span>You already purchased access to this exclusive video</span>
			</div>
		)
	}

	return (
		<div className="text-center font-semibold flex justify-center items-center">
			<Button
				title={`Unlock Instant Access for $${getTieredAccessPriceUsd(video)}`}
				colorClass="bg-blue-300 dark:bg-blue-400"
				hoverClass="hover:bg-blue-400 dark:hover:bg-blue-500"
				className="font-semibold text-zinc-950"
				onClick={clickTiersButton}
			/>
		</div>
	)
}

export default observer(ReviewInstantAccessButton)
