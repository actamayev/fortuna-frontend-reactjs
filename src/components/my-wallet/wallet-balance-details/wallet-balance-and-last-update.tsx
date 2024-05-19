import WalletBalance from "../wallet-balance"
import LastSolanaPrice from "./last-solana-price"

export default function WalletBalanceAndLastUpdate() {
	return (
		<div className="bg-white shadow-lg rounded-md p-4 mt-3 grid grid-cols-1 grid-rows-1 border">
			<div>
				Wallet Balance: <WalletBalance />
			</div>
			<LastSolanaPrice />
		</div>
	)
}
