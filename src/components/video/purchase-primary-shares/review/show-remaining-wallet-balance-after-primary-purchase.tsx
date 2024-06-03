import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../../../contexts/video-context"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function ShowRemainingWalletBalanceAfterPrimaryPurchase() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const exchangeClass = useExchangeContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass) || _.isNull(exchangeClass)) return null

	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	const amountSpendingOnPrimaryPurchaseUsd =
		video.listingSharePriceUsd * exchangeClass.purchasePrimarySplSharesDetails.numberOfTokensPurchasing

	const remainingWalletBalanceUsd = solanaClass.walletBalanceUSD.get() - amountSpendingOnPrimaryPurchaseUsd

	if (defaultCurrency === "usd") {
		return (
			<div className="flex justify-between mb-1">
				<div>New Balance:</div>
				<div>
					${remainingWalletBalanceUsd.toFixed(2)} {" "}
					<span className="text-red-600">
						(-${amountSpendingOnPrimaryPurchaseUsd.toFixed(2)})
					</span>
				</div>
			</div>
		)
	}

	const solPriceInUSD = solanaClass.solPriceDetails?.solPriceInUSD
	if (_.isUndefined(solPriceInUSD)) return null
	return (
		<div className="flex justify-between mb-1">
			<div>New Balance:</div>
			<div>
				{(remainingWalletBalanceUsd / solPriceInUSD).toFixed(4)} SOL {" "}
				<span className="text-red-600">
					(-{(amountSpendingOnPrimaryPurchaseUsd / solPriceInUSD).toFixed(4)} SOL)
				</span>
			</div>
		</div>
	)
}

export default observer(ShowRemainingWalletBalanceAfterPrimaryPurchase)
