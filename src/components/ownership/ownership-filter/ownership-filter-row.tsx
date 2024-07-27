import OwnershipSearch from "./ownership-search"
import SortByDateAndAmountPaid from "./sort-by-date-and-amount-paid"

export default function OwnershipFilterRow() {
	return (
		<div className="flex m-2.5">
			<div className="flex flex-row text-zinc-600 dark:text-zinc-200 text-sm">
				<div className="p-1 mr-2 rounded-xl">
					<div className="flex flex-row">
						<SortByDateAndAmountPaid />
					</div>
				</div>
				<div className="border border-zinc-700 dark:border-zinc-300 p-0.5 rounded-xl">
					<OwnershipSearch />
				</div>
			</div>
		</div>
	)
}
