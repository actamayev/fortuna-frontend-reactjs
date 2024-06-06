import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import FormGroup from "../../form-group"
import { useCreatorContext } from "../../../contexts/creator-context"

interface Props {
	tierNumber: number
}

function ChooseTierDiscount(props: Props) {
	const { tierNumber } = props
	const creatorClass = useCreatorContext()

	const updateNewVideoDetails = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(creatorClass)) return
		creatorClass.updateNewVideoTierDetails("tierDiscount", tierNumber, Number(event.target.value))
		creatorClass.updateNewVideoTierDetails(
			"listingPriceToAccessUsd",
			tierNumber,
			(100 - Number(event.target.value)) * creatorClass.lowestTierPrice
		)
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
		<FormGroup
			label={`Discount %, relative to Tier ${lowestTier.toString()}`}
			type="number"
			placeholder="10%"
			onChange={updateNewVideoDetails}
			value={discountAtThisTier.toString() || ""}
			maxValue={100}
		/>
	)
}

export default observer(ChooseTierDiscount)
