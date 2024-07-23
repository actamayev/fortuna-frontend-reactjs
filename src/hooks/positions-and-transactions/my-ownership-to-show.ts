import _ from "lodash"
import { useObserver } from "mobx-react"
import { usePositionsAndTransactionsContext } from "../../contexts/positions-and-transactions-context"

export default function useMyOwnershipToShow(): MyPurchasedExclusiveContent[] {
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	return useObserver(() => {
		if (_.isNull(positionsAndTransactionsClass)) return []

		let filteredOwnership = positionsAndTransactionsClass.myPurchasedExclusiveContent

		if (!_.isEmpty(positionsAndTransactionsClass.ownershipFilter.ownershipTitleIncludes)) {
			filteredOwnership = filteredOwnership.filter(ownership =>
				ownership.videoName.toLowerCase().includes(
					positionsAndTransactionsClass.ownershipFilter.ownershipTitleIncludes.toLowerCase()
				)
			)
		}

		if (positionsAndTransactionsClass.ownershipFilter.sortBy === "Date Purchased") {
			filteredOwnership = filteredOwnership.slice().sort((a, b) =>
				positionsAndTransactionsClass.ownershipFilter.orderBy === "asc"
					? new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
					: new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
			)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else if (positionsAndTransactionsClass.ownershipFilter.sortBy === "Amount Paid") {
			filteredOwnership = filteredOwnership.slice().sort((a, b) =>
				positionsAndTransactionsClass.ownershipFilter.orderBy === "asc"
					? a.priceInUsd - b.priceInUsd
					: b.priceInUsd - a.priceInUsd
			)
		}

		return filteredOwnership
	})
}
