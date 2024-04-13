import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"

function SelectTransferOption() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<select
			value={solanaClass.transferSolDetails.transferOption}
			onChange={(e) => solanaClass.updateTransferSolDetails("transferOption", e.target.value as TransferOption) }
			className="border rounded-lg p-2"
		>
			<option value="username">Username</option>
			<option value="publicKey">Public Key</option>
		</select>
	)
}

export default observer(SelectTransferOption)
