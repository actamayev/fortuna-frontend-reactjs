import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"
import SelectOfferingSharePriceSol from "./select-offering-share-price-sol"
import SelectOfferingSharePriceUsd from "./select-offering-share-price-usd"

function SelectOfferingSharePrice() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	if (solanaClass.newSplDetails.listingDefaultCurrency === "sol") {
		return <SelectOfferingSharePriceSol />
	}
	return <SelectOfferingSharePriceUsd />
}

export default observer(SelectOfferingSharePrice)
