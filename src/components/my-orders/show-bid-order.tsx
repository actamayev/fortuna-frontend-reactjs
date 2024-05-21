import { useMemo } from "react"
import { observer } from "mobx-react"
import useDateFormatter from "../../hooks/date-formatter"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	bidOrder: BidOrderData
}

function ShowAskOrder(props: Props) {
	const { bidOrder } = props
	const navigateToVideoPage = useNavigateToVideo()
	const dateFormatter = useDateFormatter()

	const isOrderFilled = useMemo(() => {
		return bidOrder.remainingNumberOfSharesBiddingFor
	}, [bidOrder.remainingNumberOfSharesBiddingFor])

	return (
		<div className="flex justify-between items-center">
			<div>
                Bidding for{" "}
				<span
					className="hover:underline cursor-pointer font-bold"
					onClick={() => navigateToVideoPage(bidOrder.uuid)}
				>
					{bidOrder.splName}
				</span>,{" "}
				{bidOrder.numberOfSharesBiddingFor} Share{bidOrder.numberOfSharesBiddingFor > 1 ? "s" : ""}{" "}
                at ${bidOrder.bidPricePerShareUsd}/Share
			</div>
			<span className="mx-auto">
				{isOrderFilled === 0 && <> ORDER FILLED</>}
			</span>
			<span className="ml-auto">
				{dateFormatter(bidOrder.createdAt)}
			</span>
		</div>
	)
}

export default observer(ShowAskOrder)
