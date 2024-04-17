import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"

interface Props {
	maxSharesAvailableToPurchase: number
}

function SelectNumberSharesToPurchase(props: Props) {
	const { maxSharesAvailableToPurchase } = props
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<input
			type="number"
			value={solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
			onChange={(e) => solanaClass.updatePurchaseSplSharesDetails("numberOfTokensPurchasing", Number(e.target.value))}
			className="border rounded-lg p-2"
			placeholder="Number of shares"
			max={maxSharesAvailableToPurchase}
			min={0}
			step={1}
		/>
	)
}

export default observer(SelectNumberSharesToPurchase)
