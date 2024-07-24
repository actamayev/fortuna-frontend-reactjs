import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import BackButton from "../../../buttons/back-button"
import ForwardButton from "../../../buttons/forward-button"
import { isSolanaTransaction } from "../../../../utils/type-checks"
import useMyTransactionsToShow from "../../../../hooks/positions-and-transactions/transactions-to-show"
import { usePositionsAndTransactionsContext } from "../../../../contexts/positions-and-transactions-context"

interface Props {
	transaction: SolanaTransaction | MyPurchasedExclusiveContent
}

function TransactionSummaryHeader(props: Props) {
	const { transaction } = props
	const myTransactionsToShow = useMyTransactionsToShow()
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()

	const backShiftTransactionFocus = useCallback(() => {
		if (_.isNull(positionsAndTransactionsClass)) return
		const currentIndex = myTransactionsToShow.findIndex(t => {
			if (isSolanaTransaction(t)) {
				return t.solTransferId === (transaction as SolanaTransaction).solTransferId
			} else {
				return t.uuid === (transaction as MyPurchasedExclusiveContent).uuid
			}
		})

		if (currentIndex <= 0) return

		const previousTransaction = myTransactionsToShow[currentIndex - 1]
		const newTransactionId = isSolanaTransaction(previousTransaction)
			? previousTransaction.solTransferId
			: previousTransaction.uuid
		positionsAndTransactionsClass.updateTransactionToFocusOn(newTransactionId)
	}, [positionsAndTransactionsClass, myTransactionsToShow, transaction])

	const forwardShiftTransactionFocus = useCallback(() => {
		if (_.isNull(positionsAndTransactionsClass)) return
		const currentIndex = myTransactionsToShow.findIndex(t => {
			if (isSolanaTransaction(t)) {
				return t.solTransferId === (transaction as SolanaTransaction).solTransferId
			} else {
				return t.uuid === (transaction as MyPurchasedExclusiveContent).uuid
			}
		})
		if (currentIndex >= myTransactionsToShow.length - 1) return

		const nextTransaction = myTransactionsToShow[currentIndex + 1]
		const newTransactionId = isSolanaTransaction(nextTransaction)
			? nextTransaction.solTransferId
			: nextTransaction.uuid
		positionsAndTransactionsClass.updateTransactionToFocusOn(newTransactionId)
	}, [positionsAndTransactionsClass, myTransactionsToShow, transaction])

	return (
		<div className="flex justify-between items-center text-lg font-bold mb-2">
			<div className="flex-grow-0">
				<BackButton
					onClick={backShiftTransactionFocus}
					disabled={myTransactionsToShow.findIndex(t => {
						if (isSolanaTransaction(t)) {
							return t.solTransferId === (transaction as SolanaTransaction).solTransferId
						} else {
							return t.uuid === (transaction as MyPurchasedExclusiveContent).uuid
						}
					}) <= 0}
				/>
			</div>
			<div className="flex-grow text-center">
				Transaction Summary
			</div>
			<div className="flex-grow-0">
				<ForwardButton
					onClick={forwardShiftTransactionFocus}
					disabled={myTransactionsToShow.findIndex(t => {
						if (isSolanaTransaction(t)) {
							return t.solTransferId === (transaction as SolanaTransaction).solTransferId
						} else {
							return t.uuid === (transaction as MyPurchasedExclusiveContent).uuid
						}
					}) >= myTransactionsToShow.length - 1}
				/>
			</div>
		</div>
	)
}

export default observer(TransactionSummaryHeader)
