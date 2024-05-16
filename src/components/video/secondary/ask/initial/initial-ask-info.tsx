import AskValue from "./ask-value"
import ReviewAskButton from "./review-ask-button"
import ImpliedVideoValue from "../../implied-video-value"
import SelectLimitAskPrice from "./select-limit-ask-price"
import ShowNumberSharesUserHolds from "./show-number-shares-user-holds"
import SelectNumberSharesAskingFor from "./select-number-shares-asking-for"

export default function InitialAskInfo() {
	return (
		<div>
			<div className="mt-2">
				<ShowNumberSharesUserHolds />
			</div>
			<div className="mt-2">
				<SelectNumberSharesAskingFor />
			</div>
			<div className="mt-2">
				<SelectLimitAskPrice />
			</div>
			<div className="mt-2">
				<AskValue />
			</div>
			<div className="mt-2">
				<ImpliedVideoValue />
			</div>
			<div className="mt-2">
				<ReviewAskButton />
			</div>
		</div>
	)
}
