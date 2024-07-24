import _ from "lodash"
import { observer } from "mobx-react"
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
			Profit from video:&nbsp;
			<ShowProvidedUsdOrSolPrice
				roundOrFixed="fixed"
				solPriceToDisplay={content.totalCreatorProfitInSol}
				usdPriceToDisplay={content.totalCreatorProfitInUsd}
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
