import { useCallback, useEffect } from "react"
import BackButton from "../../../../buttons/back-button"
import { isSolanaTransaction } from "../../../../../utils/type-checks"
import useMyTransactionsToShow from "../../../../../hooks/positions-and-transactions/transactions-to-show"
import { usePositionsAndTransactionsContext } from "../../../../../contexts/positions-and-transactions-context"

interface Props {
	transaction: SolanaTransaction | MyPurchasedExclusiveContent
}

export default function TransactionBackButton(props: Props) {
	const { transaction } = props
	const positionsAndTransactionsClass = usePositionsAndTransactionsContext()
	const myTransactionsToShow = useMyTransactionsToShow()

	const backShiftTransactionFocus = useCallback(() => {
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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				backShiftTransactionFocus()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [backShiftTransactionFocus])

	return (
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
	)
}
