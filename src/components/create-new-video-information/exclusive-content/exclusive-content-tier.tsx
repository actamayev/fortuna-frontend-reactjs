import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import ChooseTierLimit from "./choose-tier-limit"
import ChooseDiscount from "./choose-tier-discount"
import DeleteTierButton from "./delete-tier-button"
import RangeSelectorSlider from "../../range-selector-slider"
import { useCreatorContext } from "../../../contexts/creator-context"
import useIsNewVideoLoading from "../../../hooks/creator/create-video/is-new-video-loading"

interface Props {
	tierNumber: number
}

function ExclusiveContentTier(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()
	const isNewVideoLoading = useIsNewVideoLoading()

	const listingPriceToAccessUsd = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].listingPriceToAccessUsd || 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1].listingPriceToAccessUsd, tierNumber])

	const areThereMoreTiers = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.areThereMoreTiers(tierNumber)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tierNumber, creatorClass?.newVideoDetails.tierData.length])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoTierDetails("listingPriceToAccessUsd", tierNumber, Number(event.target.value))
	}, [creatorClass, tierNumber])

	if (areThereMoreTiers === false) {
		return (
			<div>
				<div className="flex justify-between items-center">
					<span className="mb-4 font-semibold">Tier {tierNumber}</span>
					<div className="flex justify-end">
						<DeleteTierButton tierNumber={tierNumber} />
					</div>
				</div>
				<RangeSelectorSlider
					title="Price to access content ($)"
					value={listingPriceToAccessUsd}
					onChange={updateNewVideoDetails}
					min={0.5}
					max={50}
					step={0.05}
					disabled={isNewVideoLoading}
				/>
				<div>
					${_.round(listingPriceToAccessUsd, 2)}
				</div>
				<ChooseTierLimit tierNumber={tierNumber} infiniteAllowed={true} />
			</div>
		)
	}

	return (
		<div>
			<div className="flex justify-between items-center">
				<span className="mb-4 font-semibold">Tier {tierNumber}</span>
				<div className="flex justify-end">
					<DeleteTierButton tierNumber={tierNumber} />
				</div>
			</div>
			<ChooseDiscount tierNumber={tierNumber}/>
			<ChooseTierLimit tierNumber={tierNumber} infiniteAllowed={false} />
		</div>
	)
}

export default observer(ExclusiveContentTier)
