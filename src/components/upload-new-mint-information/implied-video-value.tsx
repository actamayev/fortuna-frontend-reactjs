import _ from "lodash"
import { observer } from "mobx-react"
import numberWithCommas from "../../utils/number-with-commas"
import { useSolanaContext } from "../../contexts/solana-context"
import useDefaultCurrency from "../../hooks/memos/default-currency"

function ImpliedVideoValue() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	const { listingSharePriceUsd, numberOfShares } = solanaClass.newSplDetails
	let videoValue = listingSharePriceUsd * numberOfShares

	if (defaultCurrency === "usd") {
		return <>${numberWithCommas(videoValue)}</>
	}
	const solPriceUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (!_.isUndefined(solPriceUSD)) {
		videoValue = videoValue / solPriceUSD
	}
	return <>{numberWithCommas(videoValue)} SOL</>
}

export default observer(ImpliedVideoValue)
