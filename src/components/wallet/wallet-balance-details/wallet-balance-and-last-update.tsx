import WalletBalance from "../wallet-balance"
import LastSolanaPrice from "./last-solana-price"

export default function WalletBalanceAndLastUpdate() {
	return (
		<div
			className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 my-3 \
				grid grid-cols-1 grid-rows-1 text-zinc-950 dark:text-zinc-200"
		>
			<div>
				Wallet Balance: <WalletBalance />
			</div>
			<LastSolanaPrice />
		</div>
	)
}
