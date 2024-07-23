import { useCallback } from "react"
import { observer } from "mobx-react"
import { useNotificationsContext } from "../../../../contexts/notifications-context"

interface Props {
	transactionSignature: string
}

function ShowMyPublicKey(props: Props) {
	const { transactionSignature } = props

	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(transactionSignature)
			notificationsClass.setNeutralNotification("Transaction Signature copied to clipboard")
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [notificationsClass, transactionSignature])

	return (
		<div className="font-semibold flex items-center">
			<div className="flex items-center dark:text-zinc-200">
				<span className="mr-2">Transaction Signature:</span>
				<div className="cursor-pointer flex-shrink-0" onClick={copyToClipboard}>
					{transactionSignature}
				</div>
			</div>
		</div>
	)
}

export default observer(ShowMyPublicKey)
