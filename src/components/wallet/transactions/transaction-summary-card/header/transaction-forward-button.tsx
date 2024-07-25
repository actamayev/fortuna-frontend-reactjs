import _ from "lodash"
import { useCallback, useEffect } from "react"
import ForwardButton from "../../../../buttons/forward-button"
import { isSolanaTransaction } from "../../../../../utils/type-checks"
import useMyTransactionsToShow from "../../../../../hooks/positions-and-transactions/transactions-to-show"
import { usePositionsAndTransactionsContext } from "../../../../../contexts/positions-and-transactions-context"

interface Props {
	transaction: SolanaTransaction | MyPurchasedExclusiveContent
}

export default function TransactionForwardButton(props: Props) {
	const { transaction } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const myTransactionsToShow = useMyTransactionsToShow()

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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				forwardShiftTransactionFocus()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [forwardShiftTransactionFocus])

	return (
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
	)
}
