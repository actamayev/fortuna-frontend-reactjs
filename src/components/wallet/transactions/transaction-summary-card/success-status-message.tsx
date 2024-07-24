import TransactionSummaryCardCategoryHeader from "./transaction-summary-card-category-header"

export default function SuccessStatusMessage() {
	return (
		<div className="flex flex-row">
			<TransactionSummaryCardCategoryHeader categoryName="Status" />
			<div className="text-green-600 dark:text-green-400">Complete</div>
		</div>
	)
}
