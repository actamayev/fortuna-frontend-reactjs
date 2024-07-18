import _ from "lodash"
import { observer } from "mobx-react"
import { numberWithCommasFixed } from "../../../utils/numbers-with-commas"
import ShowProvidedUsdOrSolPrice from "../../usd-or-sol/show-provided-usd-or-sol-price"

interface Props {
	content: MyContent
}

function EarningsSection(props: Props) {
	const { content } = props

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
			<ShowProvidedUsdOrSolPrice
				solPriceToDisplay={
					<>{numberWithCommasFixed(content.totalCreatorProfitInSol, 4)} SOL</>
				}
				usdPriceToDisplay={
					<>${numberWithCommasFixed(content.totalCreatorProfitInUsd, 2)}</>
				}
			/>
			{!_.isNull(content.numberOfExclusivePurchasesSoFar) && (
				<div>
					Number of purchases: {content.numberOfExclusivePurchasesSoFar}
				</div>
			)}
		</div>
	)
}

export default observer(EarningsSection)
