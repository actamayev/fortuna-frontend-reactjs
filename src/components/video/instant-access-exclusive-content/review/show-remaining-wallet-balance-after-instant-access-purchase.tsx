import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import ShowUsdOrSolPrice from "../../../usd-or-sol/show-usd-or-sol-price"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: UrlExtendedSingleVideoData
}

function ShowRemainingWalletBalanceAfterInstantAccessPurchase(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()

	const tierAccessPriceUsd = getTieredAccessPriceUsd(video)
	if (_.isNull(tierAccessPriceUsd)) return null

	const remainingWalletBalanceUsd = solanaClass.walletBalanceUSD.get() - tierAccessPriceUsd

	return (
		<div>
			{remainingWalletBalanceUsd < 0 ? (
				<>Insufficient funds</>
			) : (
				<ShowUsdOrSolPrice
					usdAmount={remainingWalletBalanceUsd}
					roundOrFixed="fixed"
				/>
			)}
		</div>
	)
}

export default observer(ShowRemainingWalletBalanceAfterInstantAccessPurchase)
