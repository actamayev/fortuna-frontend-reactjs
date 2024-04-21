import _ from "lodash"
import { observer } from "mobx-react"
import SelectOfferingSharePriceSol from "./select-offering-share-price-sol"
import SelectOfferingSharePriceUsd from "./select-offering-share-price-usd"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function SelectOfferingSharePrice() {
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(personalInfoClass)) return null

	if (personalInfoClass.getDefaultCurrency() === "sol") {
		return <SelectOfferingSharePriceSol />
	}
	return <SelectOfferingSharePriceUsd />
}

export default observer(SelectOfferingSharePrice)
