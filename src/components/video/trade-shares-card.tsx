import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import Button from "../button"
import { useAuthContext } from "../../contexts/auth-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { useExchangeContext } from "../../contexts/exchange-context"
import TradeSecondaryShares from "./secondary/trade-secondary-shares"
import PurchasePrimarySharesOptions from "./purchase-primary-shares/purchase-primary-shares-options"

interface Props {
	video: VideoDataWithVideoUrl
}

function TradeSharesCard(props: Props) {
	const { video } = props
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const exchangeClass = useExchangeContext()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(video.uuid)) return true
		return exchangeClass.checkIfUuidExistsInContentList(video.uuid)
	}, [exchangeClass, video.uuid])

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

	if (wasVideoCreatedByUser === true) {
		return (
			<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-3 h-full">
				Unable to purchase own shares
			</div>
		)
	}

	return (
		<div className="bg-white dark:bg-slate-400 shadow-lg rounded-lg p-3 h-full">
			{video.splListingStatus === "SOLDOUT" ? (
				<TradeSecondaryShares />
			) : (
				<PurchasePrimarySharesOptions />
			)}
		</div>
	)
}

export default observer(TradeSharesCard)
