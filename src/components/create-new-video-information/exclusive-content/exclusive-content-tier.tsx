import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import ShowTierPrice from "./show-tier-price"
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

	const tierAccessPriceUsd = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].tierAccessPriceUsd || 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd, tierNumber])

	const areThereMoreTiers = useMemo(() => {
		if (_.isNull(creatorClass)) return false
		return creatorClass.areThereMoreTiers(tierNumber)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, tierNumber, creatorClass?.newVideoDetails.tierData.length])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoTierDetails("tierAccessPriceUsd", tierNumber, Number(event.target.value))
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
					value={tierAccessPriceUsd}
					onChange={updateNewVideoDetails}
					min={0.5}
					max={50}
					step={0.05}
					disabled={isNewVideoLoading}
					customWidth="w-5/6"
				/>
				<div>
					${_.round(tierAccessPriceUsd, 2)}
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
			<ShowTierPrice tierNumber={tierNumber} />
			<ChooseTierLimit tierNumber={tierNumber} infiniteAllowed={false} />
		</div>
	)
}

export default observer(ExclusiveContentTier)
