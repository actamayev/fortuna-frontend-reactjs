import _ from "lodash"
import { observer } from "mobx-react"
import ShowUsdOrSolPrice from "../../../show-usd-or-sol-price"
import { useSolanaContext } from "../../../../contexts/solana-context"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: SingleVideoDataFromBackend
}

function ShowRemainingWalletBalanceAfterInstantAccessPurchase(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null
	const tierAccessPriceUsdUsd = getTieredAccessPriceUsd(video)
	if (_.isNull(tierAccessPriceUsdUsd)) return null

	const remainingWalletBalanceUsd = solanaClass.walletBalanceUSD.get() - tierAccessPriceUsdUsd

	return (
		<div>
			<ShowUsdOrSolPrice usdAmount={remainingWalletBalanceUsd} roundOrFixed="fixed"/>
		</div>
	)
}

export default observer(ShowRemainingWalletBalanceAfterInstantAccessPurchase)
