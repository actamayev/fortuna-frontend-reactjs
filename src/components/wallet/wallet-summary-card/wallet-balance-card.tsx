import { useState } from "react"
import WalletSummaryBody from "./wallet-summary-body"
import WalletSummaryHeader from "./wallet-summary-header"

export default function WalletSummaryCard() {
	const [isOpen, setIsOpen] = useState(true)


	return (
		<div className="bg-zinc-100 dark:bg-zinc-800 rounded-md px-4 py-2 text-zinc-950 dark:text-zinc-200 mb-4">
			<WalletSummaryHeader isOpen={isOpen} setIsOpen={setIsOpen} />
			<WalletSummaryBody isOpen={isOpen} />
		</div>
	)
}
