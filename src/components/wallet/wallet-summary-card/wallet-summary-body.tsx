import Deposits from "./deposits"
import Withdrawals from "./withdrawals"
import WalletBalance from "../wallet-balance"
import LastSolanaPrice from "./last-solana-price"
import ShowMyPublicKey from "../show-my-public-key"
import MoneyTransferButton from "../transfer-funds/money-transfer-button"

interface Props {
	isOpen: boolean
}

export default function WalletSummaryBody(props: Props) {
	const { isOpen } = props

	if (isOpen === false) return null

	return (
		<div>
			<div className="flex justify-between mt-2">
				<ShowMyPublicKey />
				<div className="flex space-x-4">
					<div><MoneyTransferButton /></div>
				</div>
			</div>
			<div className="grid grid-cols-5 gap-4 mt-3">
				<WalletBalance />
				<div className="col-span-2">
					<LastSolanaPrice />
				</div>
				<Deposits />
				<Withdrawals />
			</div>
		</div>
	)
}
