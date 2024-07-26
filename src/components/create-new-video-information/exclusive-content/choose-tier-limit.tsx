import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../../form-group"
import Slider from "../../sliders/slider"
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
	const isNewVideoLoading = useIsNewVideoLoading()

	const checkBuyerLimit = useCallback(() => {
		if (creatorClass.newVideoDetails.tierData[tierNumber - 1].isPurchaseTierChecked === true) {
			creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, null)
		} else {
			creatorClass.updateNewVideoTierDetails("isPurchaseTierChecked", tierNumber, true)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass, creatorClass.newVideoDetails.tierData[tierNumber - 1].isPurchaseTierChecked, tierNumber])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, null)
			return
		}
		creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, handleMinNumberInput(event, 1))
	}, [creatorClass, tierNumber])

	const purchasesInThisTier = useMemo(() => {
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].purchasesInThisTier
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass.newVideoDetails.tierData[tierNumber - 1].purchasesInThisTier, tierNumber])

	if (infiniteAllowed === false) {
		return (
			<FormGroup
				label="Participant limit at this tier"
				type="number"
				placeholder="##"
				onChange={updateNewVideoDetails}
				value={purchasesInThisTier?.toString() || ""}
				minValue={1}
				className="mb-4"
			/>
		)
	}

	return (
		<div>
			<div className="flex items-center">
				<span className="text-sm text-zinc-600 dark:text-zinc-200 font-medium">
					Limit number of buyers at this tier
				</span>
				<Slider
					checkedCondition={creatorClass.newVideoDetails.tierData[tierNumber - 1].isPurchaseTierChecked === true}
					onChangeCheckedCondition={checkBuyerLimit}
					disabledCondition={isNewVideoLoading}
					colorChangeOnToggle={true}
				/>
			</div>
			{creatorClass.newVideoDetails.tierData[tierNumber - 1].isPurchaseTierChecked && (
				<FormGroup
					label="Participant limit at this tier"
					type="number"
					placeholder="##"
					onChange={updateNewVideoDetails}
					value={purchasesInThisTier?.toString() || ""}
					minValue={1}
					className="mb-4"
				/>
			)}
		</div>
	)
}

export default observer(ChooseTierLimit)
