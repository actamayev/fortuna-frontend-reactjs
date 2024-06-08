import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"
import getTieredAccessPriceUsd from "../../../../utils/video-access-tiers/get-tiered-access-price-usd"

interface Props {
	video: SingleVideoDataFromBackend
}

function ShowRemainingWalletBalanceAfterInstantAccessPurchase(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null
	const tierAccessPriceUsd = getTieredAccessPriceUsd(video)
	if (_.isNull(tierAccessPriceUsd)) return null

	const remainingWalletBalanceUsd = solanaClass.walletBalanceUSD.get() - tierAccessPriceUsd

	if (defaultCurrency === "usd") {
		return <>${remainingWalletBalanceUsd.toFixed(2)}</>
	}

	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return <>{(remainingWalletBalanceUsd / solPriceInUSD).toFixed(4)} SOL</>
}

export default observer(ShowRemainingWalletBalanceAfterInstantAccessPurchase)
