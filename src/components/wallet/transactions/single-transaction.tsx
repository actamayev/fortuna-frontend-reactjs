import { isSolanaTransaction } from "../../../utils/type-checks"
import SingleSolanaTransaction from "./single-solana-transaction"
import SingleContentPurchaseTransaction from "./single-content-purchase-transaction"

interface Props {
	transaction: SingleTransaction
}

export default function SingleTransaction(props: Props) {
	const { transaction } = props

	if (isSolanaTransaction(transaction)) {
		return <SingleSolanaTransaction solanaTransaction={transaction} />
	}
	return <SingleContentPurchaseTransaction exclusiveContentPurchase={transaction} />
}
