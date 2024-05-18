import WalletBalance from "../wallet-balance"
import LastSolanaPrice from "./last-solana-price"

export default function WalletBalanceAndLastUpdate() {
	return (
		<div>
			<div>
				Wallet Balance: <WalletBalance />
			</div>
			<LastSolanaPrice />
		</div>
	)
}
