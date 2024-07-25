import TransactionBackButton from "./transaction-back-button"
import TransactionForwardButton from "./transaction-forward-button"

interface Props {
	transaction: SolanaTransaction | MyPurchasedExclusiveContent
}

export default function TransactionSummaryHeader(props: Props) {
	const { transaction } = props

	return (
		<div className="flex justify-between items-center text-lg font-semibold mb-2">
			<div className="flex-grow-0">
				<TransactionBackButton transaction={transaction} />
			</div>
			<div className="flex-grow text-center">
				Transaction Summary
			</div>
			<div className="flex-grow-0">
				<TransactionForwardButton transaction={transaction}/>
			</div>
		</div>
	)
}
