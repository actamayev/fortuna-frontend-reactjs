import _ from "lodash"
import { useMemo } from "react"
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

	const remainingWalletBalanceUsd = useMemo(() =>{
		const tierAccessPriceUsd = getTieredAccessPriceUsd(video)
		if (_.isNull(tierAccessPriceUsd)) return -1
		return solanaClass.walletBalanceUSD.get() - tierAccessPriceUsd
	}, [solanaClass.walletBalanceUSD, video])

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
