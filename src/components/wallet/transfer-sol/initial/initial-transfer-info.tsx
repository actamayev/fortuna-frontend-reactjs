import _ from "lodash"
import { observer } from "mobx-react"
import UsernameSearch from "./username-search"
import PublicKeySearch from "./public-key-search"
import SelectTransferAmount from "./select-transfer-amount"
import ReviewTransferButton from "./review-transfer-button"
import SelectTransferOption from "./select-transfer-option"
import { useSolanaContext } from "../../../../contexts/solana-context"

function InitialTransferInfo() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<div className="text-center font-semibold">Transfer Sol</div>
			<SelectTransferOption />

			{solanaClass.transferSolDetails.transferOption === "username" ? (
				<UsernameSearch />
			) : (
				<PublicKeySearch />
			)}

			<SelectTransferAmount />

			<ReviewTransferButton />
		</>
	)
}

export default observer(InitialTransferInfo)
