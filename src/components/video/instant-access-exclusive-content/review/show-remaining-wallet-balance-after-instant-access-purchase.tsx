import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

interface Props {
	video: SingleVideoDataFromBackend
}

function ShowRemainingWalletBalanceAfterInstantAccessPurchase(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (
		_.isNull(solanaClass) ||
		_.isNull(exchangeClass) ||
		_.isNull(personalInfoClass) ||
		_.isNull(video.priceToInstantlyAccessExclusiveContentUsd)
	) return null

	const remainingWalletBalanceUsd = solanaClass.walletBalanceUSD.get() - video.priceToInstantlyAccessExclusiveContentUsd

	if (personalInfoClass.defaultCurrency === "usd") {
		return <>${remainingWalletBalanceUsd.toFixed(2)}</>
	}

	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return <>{(remainingWalletBalanceUsd / solPriceInUSD).toFixed(4)} SOL</>
}

export default observer(ShowRemainingWalletBalanceAfterInstantAccessPurchase)
