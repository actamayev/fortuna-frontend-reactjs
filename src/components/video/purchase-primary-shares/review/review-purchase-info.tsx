import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import ShowPurchasePrice from "./show-purchase-price"
import { useVideoContext } from "../../../../contexts/video-context"
import PrimaryPurchaseBackButton from "./primary-purchase-back-button"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import ConfirmPrimaryPurchaseButton from "./confirm-primary-purchase-button"
import ShowRemainingWalletBalanceAfterPrimaryPurchase from "./show-remaining-wallet-balance-after-primary-purchase"

function ReviewPurchaseInfo() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	if (_.isUndefined(videoUUID)) return null
	const video = videoClass.findVideoFromUUID(videoUUID)
	if (_.isUndefined(video)) return null

	return (
		<>
			<div className="flex flex-row justify-between items-center font-semibold w-full">
				<PrimaryPurchaseBackButton />
				<div className="text-center flex-1">
					Review Purchase
				</div>
			</div>
			<ShowPurchasePrice video={video}/>
			<div className="flex justify-between">
				<div>
					New Balance: {" "}
				</div>
				<div>
					<ShowRemainingWalletBalanceAfterPrimaryPurchase video={video} />
				</div>
			</div>
			<div className="flex justify-center mt-2">
				<ConfirmPrimaryPurchaseButton />
			</div>
		</>
	)
}

export default observer(ReviewPurchaseInfo)
