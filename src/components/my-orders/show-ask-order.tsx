import { useMemo } from "react"
import { observer } from "mobx-react"
import useDateFormatter from "../../hooks/date-formatter"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	askOrder: AskOrderData
}

function ShowAskOrder(props: Props) {
	const { askOrder } = props
	const navigateToVideoPage = useNavigateToVideo()
	const dateFormatter = useDateFormatter()

	const isOrderFilled = useMemo(() => {
		return askOrder.remainingNumberOfSharesForSale
	}, [askOrder.remainingNumberOfSharesForSale])

	return (
		<div className="flex justify-between items-center">
			<div>

			Asking for {" "}
				<span
					className="hover:underline cursor-pointer font-bold"
					onClick={() => navigateToVideoPage(askOrder.uuid)}
				>
					{askOrder.splName}
				</span>, {" "}
				{askOrder.numberOfsharesForSale} Share{askOrder.numberOfsharesForSale > 1 ? "s" : ""} {" "}
			at ${askOrder.askPricePerShareUsd}/Share
			</div>
			<span className="mx-auto">
				{isOrderFilled === 0 && <> ORDER FILLED</>}
			</span>
			<span className="ml-auto">
				{dateFormatter(askOrder.createdAt)}
			</span>
		</div>
	)
}

export default observer(ShowAskOrder)
