import _ from "lodash"
import { useCallback } from "react"
import { useNotificationsContext } from "../../../../contexts/notifications-context"

interface Props {
	solanaTransaction: SolanaTransaction
}

export default function TransactionSummaryCardDescription(props: Props) {
	const { solanaTransaction } = props
	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			if (_.isUndefined(solanaTransaction.transferToPublicKey)) return
			await navigator.clipboard.writeText(solanaTransaction.transferToPublicKey)
			notificationsClass.setNeutralNotification("Transaction Signature copied to clipboard")
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [notificationsClass, solanaTransaction.transferToPublicKey])

	return (
		<div className="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
		Instant transfer&nbsp;
			{solanaTransaction.depositOrWithdrawal === "deposit" && (
				<span className="overflow-hidden text-ellipsis whitespace-nowrap">
			from @{solanaTransaction.transferFromUsername}
				</span>
			)}
			{solanaTransaction.depositOrWithdrawal === "withdrawal" && (
				<span className="overflow-hidden text-ellipsis whitespace-nowrap">
			to&nbsp;
					{solanaTransaction.transferToUsername && <>@{solanaTransaction.transferToUsername}</>}
					{solanaTransaction.transferToPublicKey && (
						<span className="cursor-pointer overflow-hidden text-ellipsis" onClick={copyToClipboard}>
							{_.truncate(solanaTransaction.transferToPublicKey, { length: 15 })}
						</span>
					)}
				</span>
			)}
		</div>
	)
}
