import _ from "lodash"
import { observer } from "mobx-react"
import { SiSolana } from "react-icons/si"
import { useCallback, useMemo } from "react"
import { useNotificationsContext } from "../../../../contexts/notifications-context"

interface Props {
	transactionSignature: string
}

function ShowTransactionSignature(props: Props) {
	const { transactionSignature } = props

	const explorerUrl = useMemo(() => {
		return `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
	}, [transactionSignature])

	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(transactionSignature)
			notificationsClass.setNeutralNotification("Transaction Signature copied to clipboard")
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}, [notificationsClass, transactionSignature])

	const goToSolanaPage = useCallback(() => {
		window.open(explorerUrl, "_blank", "noopener,noreferrer")
	}, [explorerUrl])

	return (
		<div className="flex items-center">
			<div className="flex items-center dark:text-zinc-200 justify-between w-full">
				<div className="flex items-center">
					<span className="font-semibold">Transaction Signature:&nbsp;</span>
					<div className="cursor-pointer flex-shrink" onClick={copyToClipboard}>
						{_.truncate(transactionSignature, { length: 15 })}
					</div>
				</div>
				<div
					className="cursor-pointer ml-2 p-1 rounded-full border
					border-black dark:border-white hover:bg-zinc-200 hover:dark:bg-zinc-600"
					onClick={goToSolanaPage}
				>
					<SiSolana />
				</div>
			</div>
		</div>
	)
}

export default observer(ShowTransactionSignature)
