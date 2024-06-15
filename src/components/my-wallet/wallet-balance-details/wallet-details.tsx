import ShowMyPublicKey from "../show-my-public-key"
import SolOrUsdSlider from "../../sliders/sol-or-usd-slider"
import TransferFundsButton from "../transfer-funds/transfer-funds-button"
import WalletBalanceAndLastUpdate from "./wallet-balance-and-last-update"
import RequestAirdropButton from "../request-airdrop/request-airdrop-button"

export default function WalletDetails () {
	return (
		<>
			<div className="flex flex-row">
				<div className="mr-4"><TransferFundsButton /></div>
				<div className="mr-4"><RequestAirdropButton /></div>
				<div><SolOrUsdSlider /></div>
			</div>
			<div className="mt-3"><ShowMyPublicKey /></div>
			<WalletBalanceAndLastUpdate />
		</>
	)
}
