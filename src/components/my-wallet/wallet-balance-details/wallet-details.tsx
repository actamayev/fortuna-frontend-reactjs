import ShowMyPublicKey from "../show-my-public-key"
import TransferSolButton from "../transfer-sol/transfer-sol-button"
import WalletBalanceAndLastUpdate from "./wallet-balance-and-last-update"
import RequestAirdropButton from "../request-airdrop/request-airdrop-button"

export default function WalletDetails () {
	return (
		<>
			<div className="flex flex-row">
				<div className="mr-4"><TransferSolButton /></div>
				<div className="mr-4"><RequestAirdropButton /></div>
			</div>
			<div className="mt-3"><ShowMyPublicKey /></div>
			<WalletBalanceAndLastUpdate />
		</>
	)
}
