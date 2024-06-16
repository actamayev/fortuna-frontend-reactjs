import _ from "lodash"
import { useMemo } from "react"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useCheckIfUUIDExistsInExclusiveContentList(uuid: string | undefined): boolean {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const doesUserHaveAccessToExclusiveContent = useMemo(() => {
		if (_.isNull(positionsAndTransactionsClass)) return false
		return positionsAndTransactionsClass.checkIfUuidExistsInExclusiveContentList(uuid)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [positionsAndTransactionsClass, positionsAndTransactionsClass?.myPurchasedExclusiveContent, uuid])

	return doesUserHaveAccessToExclusiveContent
}
