import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useSolanaContext } from "../../../contexts/solana-context"
import useCalculateMaxSharesToPurchase from "../../../hooks/solana/purchase-spl-tokens/calculate-max-shares-to-purchase"

function SelectNumberSharesToPurchase() {
	const solanaClass = useSolanaContext()
	const { videoUUID } = useParams<{ videoUUID: string }>()
	const calculateMaxSharesToPurchase = useCalculateMaxSharesToPurchase()

	const wasVideoCreatedByUser = useMemo(() => {
		if (_.isNull(solanaClass) || _.isUndefined(videoUUID)) return true
		return solanaClass.checkIfUuidExistsInContentList(videoUUID)
	}, [solanaClass, videoUUID])

	if (_.isNull(solanaClass) || _.isUndefined(videoUUID)) return null

	if (wasVideoCreatedByUser === true) return null

	return (
		<input
			type="number"
			value={solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing}
			onChange={(e) => solanaClass.updatePurchaseSplSharesDetails("numberOfTokensPurchasing", Number(e.target.value))}
			className="border rounded-lg p-2"
			placeholder="Number of shares"
			max={calculateMaxSharesToPurchase(videoUUID)}
			min={0}
			step={1}
		/>
	)
}

export default observer(SelectNumberSharesToPurchase)
