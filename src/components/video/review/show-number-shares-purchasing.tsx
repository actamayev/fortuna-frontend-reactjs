import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"

function ShowNumberSharesPurchasing() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			Purchasing {solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing} {" "}
			share{solanaClass.purchaseSplSharesDetails.numberOfTokensPurchasing === 1 ? (<></>) : (<>s</>)} for {" "}
		</>
	)
}

export default observer(ShowNumberSharesPurchasing)
