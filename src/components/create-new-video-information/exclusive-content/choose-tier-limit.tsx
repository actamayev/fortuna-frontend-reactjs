import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import Slider from "../../slider"
import FormGroup from "../../form-group"
import { useCreatorContext } from "../../../contexts/creator-context"
import { handleMinNumberInput } from "../../../utils/handle-number-input"
import useIsNewVideoLoading from "../../../hooks/creator/create-video/is-new-video-loading"

interface Props {
	tierNumber: number
	infiniteAllowed: boolean
}

function ChooseTierLimit(props: Props) {
	const { tierNumber, infiniteAllowed } = props
	const creatorClass = useCreatorContext()
	const [isChecked, setIsChecked] = useState(false)
	const isNewVideoLoading = useIsNewVideoLoading()

	const checkBuyerLimit = useCallback(() => {
		if (_.isNull(creatorClass)) return
		if (isChecked === true) {
			creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, null)
		}
		setIsChecked(!isChecked)
	}, [creatorClass, isChecked, tierNumber])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		if (event.target.value === "") {
			creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, null)
			return
		}
		creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, handleMinNumberInput(event, 1))
	}, [creatorClass, tierNumber])

	const purchasesInThisTier = useMemo(() => {
		if (_.isNull(creatorClass)) return 0
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].purchasesInThisTier
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass?.newVideoDetails.tierData[tierNumber - 1].purchasesInThisTier, tierNumber])

	if (infiniteAllowed === false) {
		return (
			<FormGroup
				label="Participant limit at this tier"
				type="number"
				placeholder="##"
				onChange={updateNewVideoDetails}
				value={purchasesInThisTier?.toString() || ""}
				minValue={1}
			/>
		)
	}

	return (
		<div>
			<div className="flex items-center">
				<span className="text-sm text-zinc-600 dark:text-zinc-200">
					Limit number of buyers at this tier
				</span>
				<Slider
					checkedCondition={isChecked === true}
					onChangeCheckedCondition={checkBuyerLimit}
					disabledCondition={isNewVideoLoading}
					colorChangeOnToggle={true}
				/>
			</div>
			{isChecked && (
				<FormGroup
					label="Participant limit at this tier"
					type="number"
					placeholder="##"
					onChange={updateNewVideoDetails}
					value={purchasesInThisTier?.toString() || ""}
					minValue={1}
				/>
			)}
		</div>
	)
}

export default observer(ChooseTierLimit)
