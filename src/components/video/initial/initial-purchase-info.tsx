import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../../button"
import ReviewPurchaseButton from "./review-purchase-button"
import useTypedNavigate from "../../../hooks/typed-navigate"
import { useAuthContext } from "../../../contexts/auth-context"
import SelectNumberSharesToPurchase from "./select-number-shares-to-purchase"
import useCalculateMaxSharesToPurchase from "../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function InitialPurchaseInfo() {
	const authClass = useAuthContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()
	const navigate = useTypedNavigate()

	if (_.isNull(authClass.accessToken)) {
		return (
			<Button
				onClick={() => navigate("/register")}
				colorClass="bg-blue-300"
				hoverClass="hover:bg-blue-400"
				title="Please create an account with Fortuna to purchase shares"
			/>
		)
	}

	if (_.isUndefined(videoUUID)) return null

	return (
		<>
			<div className="text-center font-semibold">Purchase Shares</div>
			<SelectNumberSharesToPurchase maxSharesAvailableToPurchase = {calculateMaxSharesToPurchase(videoUUID)}/>
			<br />

			<ReviewPurchaseButton maxSharesAvailableToPurchase = {calculateMaxSharesToPurchase(videoUUID)}/>
		</>
	)
}

export default observer(InitialPurchaseInfo)
