import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function ShowRemainingWalletBalanceAfterPrimaryPurchase() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const personalInfoClass = usePersonalInfoContext()

	if (
		_.isNull(solanaClass) ||
		_.isNull(exchangeClass) ||
		_.isNull(personalInfoClass) ||
		_.isUndefined(videoUUID)
	) return null

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	const remainingWalletBalanceUsd =
		// eslint-disable-next-line max-len
		solanaClass.walletBalanceUSD.get() - video.listingSharePriceUsd * exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing

	if (personalInfoClass.defaultCurrency === "usd") {
		return <>${remainingWalletBalanceUsd.toFixed(2)}</>
	}

	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return <>{(remainingWalletBalanceUsd / solPriceInUSD).toFixed(4)} SOL</>
}

export default observer(ShowRemainingWalletBalanceAfterPrimaryPurchase)
