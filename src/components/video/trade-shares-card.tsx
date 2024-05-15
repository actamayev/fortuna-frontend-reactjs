import _ from "lodash"
import { observer } from "mobx-react"
import Button from "../button"
import { useAuthContext } from "../../contexts/auth-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import TradeSecondaryShares from "./secondary/trade-secondary-shares"
import PurchasePrimarySharesOptions from "./purchase-primary-shares/purchase-primary-shares-options"
import { useMemo } from "react"
import { useExchangeContext } from "../../contexts/exchange-context"

interface Props {
	video: VideoData
}

function TradeSharesCard(props: Props) {
	const { video } = props
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const exchangeClass = useExchangeContext()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(exchangeClass) || _.isUndefined(video.uuid)) return true
		return exchangeClass.checkIfUuidExistsInContentList(video.uuid)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangeClass, video.uuid, exchangeClass?.myContent])


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
			{/* TODO: Change to === "SOLDOUT" after testing complete */}
			{video.splListingStatus !== "SOLDOUT" ? (
				<TradeSecondaryShares />
			) : (
				<PurchasePrimarySharesOptions />
			)}
		</div>
	)
}

export default observer(TradeSharesCard)
