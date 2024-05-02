import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import ShowPurchasePrice from "./show-purchase-price"
import ConfirmPurchaseButton from "./confirm-purchase-button"
import { useVideoContext } from "../../../contexts/video-context"
import { useSolanaContext } from "../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

function ReviewPurchaseInfo() {
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const videoClass = useVideoContext()
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()

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
				<ShowPurchasePrice video={video}/>
			</div>
			<ConfirmPurchaseButton />
		</>
	)
}

export default observer(ReviewPurchaseInfo)
