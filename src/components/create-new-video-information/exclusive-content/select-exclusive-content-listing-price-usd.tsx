import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../../range-selector-slider"
import { useCreatorContext } from "../../../contexts/creator-context"
import useIsNewVideoLoading from "../../../hooks/creator/create-video/is-new-video-loading"

interface Props {
	tierNumber: number
}

function SelectExclusiveContentListingPriceUsd(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()
	const isNewVideoLoading = useIsNewVideoLoading()

	const listingPriceToAccessUsd = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber].listingPriceToAccessUsd
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber].listingPriceToAccessUsd, tierNumber])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoTierDetails("listingPriceToAccessUsd", tierNumber, Number(event.target.value))
	}, [creatorClass, tierNumber])

	return (
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title="Price to access content ($)"
				value={listingPriceToAccessUsd}
				onChange={updateNewVideoDetails}
				min={0.5}
				max={50}
				step={0.05}
				disabled={isNewVideoLoading}
			/>
			${_.round(listingPriceToAccessUsd, 2)}
		</div>
	)
}

export default observer(SelectExclusiveContentListingPriceUsd)
