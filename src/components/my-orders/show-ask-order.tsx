import { observer } from "mobx-react"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	askOrder: AskOrderData
}

function ShowAskOrder(props: Props) {
	const { askOrder } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<>
			Asking for {" "}
			<span
				className="hover:underline cursor-pointer font-bold"
				onClick={() => navigateToVideoPage(askOrder.uuid)}
			>
				{askOrder.splName}
			</span>, {" "}
			{askOrder.numberOfsharesForSale} Shares at ${askOrder.askPricePerShareUsd}/Share
			{askOrder.remainingNumberOfSharesForSale === 0 && (
				<> ORDER FILLED</>
			)}
		</>
	)
}

export default observer(ShowAskOrder)
