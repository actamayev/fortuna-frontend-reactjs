import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import Slider from "../../slider"
import FormGroup from "../../form-group"
import { useCreatorContext } from "../../../contexts/creator-context"
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

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoTierDetails("purchasesInThisTier", tierNumber, Number(event.target.value))
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
				placeholder="69"
				onChange={updateNewVideoDetails}
				value={purchasesInThisTier?.toString() || ""}
			/>
		)
	}

	return (
		<div>
			Should this tier have a limited number of buyers?
			<Slider
				checkedCondition={isChecked === true}
				onChangeCheckedCondition={() => setIsChecked(!isChecked)}
				disabledCondition={isNewVideoLoading}
				colorChangeOnToggle={true}
			/>
			{isChecked && (
				<FormGroup
					label="Participant limit at this tier"
					type="number"
					placeholder="69"
					onChange={updateNewVideoDetails}
					value={purchasesInThisTier?.toString() || ""}
				/>
			)}
		</div>
	)
}

export default observer(ChooseTierLimit)
