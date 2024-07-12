import _ from "lodash"
import { observer } from "mobx-react"
import useDefaultCurrency from "../../../hooks/memos/default-currency"

interface Props {
	content: MyContent
}

function EarningsSection(props: Props) {
	const { content } = props
	const defaultCurrency = useDefaultCurrency()

	if (content.isContentExclusive === false) {
		return (
			<div>
				N/A: Non-exclusive video
			</div>
		)
	}

	return (
		<div>
			Profit from video: {" "}
			{defaultCurrency === "sol" && (
				<>{content.totalCreatorProfitInSol.toFixed(4)} SOL</>
			)}
			{defaultCurrency === "usd" && (
				<>${content.totalCreatorProfitInUsd.toFixed(2)}</>
			)}
			{!_.isNull(content.numberOfExclusivePurchasesSoFar) && (
				<div>
					Number of purchases: {content.numberOfExclusivePurchasesSoFar}
				</div>
			)}
		</div>
	)
}

export default observer(EarningsSection)
