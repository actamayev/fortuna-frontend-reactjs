import { observer } from "mobx-react"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	bidOrder: BidOrderData
}

function ShowAskOrder(props: Props) {
	const { bidOrder } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<>
			Bidding for {" "}
			<span
				className="hover:underline cursor-pointer font-bold"
				onClick={() => navigateToVideoPage(bidOrder.uuid)}
			>
				{bidOrder.splName}
			</span>, {" "}
			{bidOrder.nuberOfSharesBiddingFor} Shares at ${bidOrder.bidPricePerShareUsd}/Share
			{bidOrder.remainingNumberOfSharesBiddingFor === 0 && (
				<> ORDER FILLED</>
			)}
		</>
	)
}

export default observer(ShowAskOrder)
