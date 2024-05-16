import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../../button"
import ShowPurchasePrice from "./show-purchase-price"
import { useVideoContext } from "../../../../contexts/video-context"
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
				<div>
					<Button
						title="<"
						colorClass="bg-blue-200"
						hoverClass="hover:bg-blue-300"
						onClick={() => exchangeClass.updatePurchasePrimarySplSharesDetails("purchaseStage", "initial")}
						className="font-semibold"
					/>
				</div>
				<div className="text-center flex-1">
					Review Purchase
				</div>
			</div>
			<ShowPurchasePrice video={video}/>
			<div className="flex justify-between">
				<div>
					Remaining Wallet Balance: {" "}
				</div>
				<div>
					<ShowRemainingWalletBalanceAfterPrimaryPurchase video={video} />
				</div>
			</div>
			<ConfirmPrimaryPurchaseButton />
		</>
	)
}

export default observer(ReviewPurchaseInfo)
