import _ from "lodash"
import { observer } from "mobx-react"
import numberWithCommas from "../../utils/number-with-commas"
import { useSolanaContext } from "../../contexts/solana-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function ImpliedVideoValue() {
	const personalInfoClass = usePersonalInfoContext()
	const solanaClass = useSolanaContext()

	if (_.isNull(personalInfoClass) || _.isNull(solanaClass)) return null

	const { listingSharePriceUsd, numberOfShares } = solanaClass.newSplDetails

	let videoValue = 0
	if (personalInfoClass.defaultCurrency === "usd") {
		videoValue = listingSharePriceUsd * numberOfShares
		return <>${numberWithCommas(videoValue)}</>
	}
	const solPriceUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (!_.isUndefined(solPriceUSD)) {
		videoValue = listingSharePriceUsd * numberOfShares / solPriceUSD
	}
	return <>{numberWithCommas(videoValue)} SOL</>
}

export default observer(ImpliedVideoValue)
