import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function OwnershipSearchBox() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		positionsAndTransactionsClass.updateOwnershipFilterTitle(event.target.value)
	}, [positionsAndTransactionsClass])

	const titleIncludes = useMemo(() => {
		return positionsAndTransactionsClass.ownershipFilter.ownershipTitleIncludes
	}, [positionsAndTransactionsClass.ownershipFilter.ownershipTitleIncludes])

	return (
		<div className="w-full bg-inherit flex items-center justify-center">
			<input
				type="text"
				placeholder="Title contains..."
				value={titleIncludes}
				onChange={handleSearch}
				className="outline-none bg-inherit p-2"
			/>
		</div>
	)
}

export default observer(OwnershipSearchBox)
