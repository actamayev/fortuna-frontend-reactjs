import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import RangeSelectorSlider from "../../range-selector-slider"
import { useCreatorContext } from "../../../contexts/creator-context"
import { handleBoundedNumberInput } from "../../../utils/handle-number-input"
import useIsNewVideoLoading from "../../../hooks/creator/create-video/is-new-video-loading"

interface Props {
	tierNumber: number
}

function ChooseTierDiscount(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()
	const isNewVideoLoading = useIsNewVideoLoading()

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoTierDetails("tierDiscount", tierNumber, handleBoundedNumberInput(event, 0, 100))
	}, [creatorClass, tierNumber])

	const discountAtThisTier = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].tierDiscount
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1].tierDiscount, tierNumber])

	const lowestTier = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData.length
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData.length])

	return (
		<div className="mb-10">
			<RangeSelectorSlider
				title={`Discount %, relative to Tier ${lowestTier.toString()}`}
				value={discountAtThisTier}
				onChange={updateNewVideoDetails}
				min={0}
				max={100}
				step={1}
				disabled={isNewVideoLoading}
			/>
			<div>{discountAtThisTier}%</div>
		</div>
	)
}

export default observer(ChooseTierDiscount)
