import TransactionTypeFilter from "./transaction-type-filter"
import TransactionsDateSorter from "./transactions-date-sorter"
import TransactionsDescriptionSearch from "./transactions-description-search"

export default function TransactionsHeader() {
	return (
		<div
			className="grid grid-cols-8 gap-4 py-3 border-b text-sm
				bg-inherit border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200"
		>
			<div className="col-span-1">
				<TransactionsDateSorter />
			</div>
			<div className="col-span-2">
				<TransactionTypeFilter />
			</div>
			<div className="col-span-1">Amount</div>
			<div className="col-span-1">Description</div>
			<div className="col-span-2">
				<TransactionsDescriptionSearch />
			</div>
			<div className="col-span-1 flex justify-end">Balance</div>
		</div>
	)
}
