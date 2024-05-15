import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../button"
import { useAuthContext } from "../../contexts/auth-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import TradeSecondaryShares from "./secondary/trade-secondary-shares"
import PurchasePrimarySharesOptions from "./purchase-primary-shares/purchase-primary-shares-options"

interface Props {
	video: VideoData
}

function TradeSharesCard(props: Props) {
	const { video } = props
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()

	if (_.isNull(authClass.accessToken)) {
		return (
			<Button
				onClick={() => navigate("/register")}
				colorClass="bg-blue-200"
				hoverClass="hover:bg-blue-300"
				title="Please create an account to purchase shares"
				className="font-semibold"
			/>
		)
	}

	return (
		<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-4 h-full">
			{video.splListingStatus !== "SOLDOUT" ? (
				<TradeSecondaryShares />
			) : (
				<PurchasePrimarySharesOptions />
			)}
		</div>
	)
}

export default observer(TradeSharesCard)
