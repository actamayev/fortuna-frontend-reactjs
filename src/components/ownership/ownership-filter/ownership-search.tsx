import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { usePositionsAndTransactionsContext } from "../../../contexts/positions-and-transactions-context"

function OwnershipSearchBox() {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(positionsAndTransactionsClass)) return
		positionsAndTransactionsClass.updateOwnershipFilterTitle(event.target.value)
	}, [positionsAndTransactionsClass])

	const titleIncludes = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return ""
		return positionsAndTransactionsClass.ownershipFilter.ownershipTitleIncludes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass?.ownershipFilter.ownershipTitleIncludes])

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
