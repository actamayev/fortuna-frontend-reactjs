import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../contexts/solana-context"

function SelectTransferAmount() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null
	if (
		solanaClass.transferSolDetails.transferOption === "username" &&
		solanaClass.transferSolDetails.isUsernameSelected === false
	) {
		return null
	} else if (solanaClass.transferSolDetails.transferOption === "publicKey") {
		if (!_.isEqual(solanaClass.transferSolDetails.publicKey.length, 44)) {
			return <>Public Key Must be 44 Characters</>
		} else if (solanaClass.transferSolDetails.doesPublicKeyExist === false) {
			return <>This Public Key Does not Exist on Solana</>
		}
	}
	return (
		<input
			type="number"
			value={solanaClass.transferSolDetails.amount}
			onChange={(e) => solanaClass.updateTransferSolDetails("amount", Number(e.target.value))}
			className="border rounded-lg p-2"
			placeholder="Amount"
		/>
	)
}

export default observer(SelectTransferAmount)
