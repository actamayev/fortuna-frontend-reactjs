import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../../form-group"
import ChooseTierLimit from "./choose-tier-limit"
import DeleteTierButton from "./delete-tier-button"
import ShowTierDiscount from "./show-tier-discount"
import { useCreatorContext } from "../../../contexts/creator-context"
import { handleBoundedNumberInput } from "../../../utils/handle-number-input"

interface Props {
	tierNumber: number
}

function ExclusiveContentTier(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const tierAccessPriceUsd = useMemo(() => {
		return creatorClass.newVideoDetails.tierData[tierNumber - 1].tierAccessPriceUsd || 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatorClass.newVideoDetails.tierData[tierNumber - 1]?.tierAccessPriceUsd, tierNumber])

	const areThereMoreTiers = useMemo(() => {
		return creatorClass.areThereMoreTiers(tierNumber)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tierNumber, creatorClass.newVideoDetails.tierData.length])

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = handleBoundedNumberInput(event, 0, 100)
		creatorClass.updateNewVideoTierDetails("tierAccessPriceUsd", tierNumber, value)
	}, [creatorClass, tierNumber])

	return (
		<div>
			<div className="flex justify-between items-center">
				<span className="mb-4 font-semibold">Tier {tierNumber}</span>
				<div className="flex justify-end">
					<DeleteTierButton tierNumber={tierNumber} />
				</div>
			</div>
			<FormGroup
				label="Price to access content ($)"
				type="number"
				placeholder="##"
				onChange={updateNewVideoDetails}
				value={tierAccessPriceUsd.toString() || ""}
				minValue={0}
				step={0.01}
				pattern="^\d*(\.\d{0,2})?$" // Pattern to restrict input to 2 decimal places
				className="w-5/6 mb-4"
			/>

			<ShowTierDiscount tierNumber={tierNumber} />
			<ChooseTierLimit
				tierNumber={tierNumber}
				infiniteAllowed={!areThereMoreTiers}
			/>
		</div>
	)
}

export default observer(ExclusiveContentTier)
