import _ from "lodash"
import { observer } from "mobx-react"
import SendSolButton from "./send-sol-button"
import UsernameSearch from "./username-search"
import PublicKeySearch from "./public-key-search"
import SelectTransferAmount from "./select-transfer-amount"
import { useSolanaContext } from "../../../contexts/solana-context"

function TransferSolCard() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<div
			className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 gap-4 border absolute z-10"
			style={{ top: "20%", left: "50%", transform: "translate(-50%, -20%)" }}
		>
			<div className="text-center font-semibold">Transfer Sol</div>
			<select
				value={solanaClass.transferSolDetails.transferOption}
				onChange={(e) => solanaClass.updateTransferSolDetails("transferOption", e.target.value as TransferOption) }
				className="border rounded-lg p-2"
			>
				<option value="username">Username</option>
				<option value="publicKey">Public Key</option>
			</select>

			{solanaClass.transferSolDetails.transferOption === "username" ? (
				<UsernameSearch />
			) : (
				<PublicKeySearch />
			)}

			<SelectTransferAmount />

			<SendSolButton />

		</div>
	)
}

export default observer(TransferSolCard)
