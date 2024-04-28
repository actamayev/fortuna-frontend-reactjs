import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import ConfirmPurchaseButton from "./confirm-purchase-button"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useConvertUsdAmountDefaultCurrency from "../../../hooks/solana/currency-conversions/convert-usd-amount-to-default-currency"

// eslint-disable-next-line complexity
function ReviewPurchaseInfo() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	const convertUsdAmountToDefaultCurrency = useConvertUsdAmountDefaultCurrency()

	if (_.isNull(solanaClass) || _.isNull(personalInfoClass)) return null

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
						onClick={() => solanaClass.updatePurchaseSplSharesDetails("purchaseStage", "initial")}
						className="font-semibold"
					/>
				</div>
				<div className="text-center flex-1">
					Review Purchase
				</div>
			</div>
			<div>
			Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} shares for
				{personalInfoClass.getDefaultCurrency() === "usd" && (<> $</>)}
				{personalInfoClass.getDefaultCurrency() === "sol" && (<> </>)}
				{convertUsdAmountToDefaultCurrency(video.offeringSharePriceUsd) *
				solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
				<> </>
			({personalInfoClass.getDefaultCurrency() === "usd" && (<>$</>)}
				{convertUsdAmountToDefaultCurrency(video.offeringSharePriceUsd)}
				{personalInfoClass.getDefaultCurrency() === "sol" && (<> SOL</>)}
			/Share)
			</div>
			<ConfirmPurchaseButton />
		</>
	)
}

export default observer(ReviewPurchaseInfo)
