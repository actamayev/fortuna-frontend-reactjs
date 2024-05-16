import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

interface Props {
	video: VideoData
}

function ShowRemainingWalletBalanceAfterPrimaryPurchase(props: Props) {
	const { video } = props
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (
		_.isNull(solanaClass) ||
		_.isNull(exchangeClass) ||
		_.isNull(personalInfoClass)
	) return null

	const remainingWalletBalanceUsd =
		// eslint-disable-next-line max-len
		solanaClass.walletBalanceUSD.get() - video.listingSharePriceUsd * exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing

	if (personalInfoClass.defaultCurrency === "usd") {
		return <>${_.round(remainingWalletBalanceUsd, 2)}</>
	}

	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return <>{_.round(remainingWalletBalanceUsd / solPriceInUSD, 4)} SOL</>
}

export default observer(ShowRemainingWalletBalanceAfterPrimaryPurchase)
