import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"

// FUTURE TODO: show the $ amount side by side, and allow the user to enter either dollar or sol amounts
// (and the other should adjust automatically)
function SelectTransferAmount() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	if (
		solanaClass.transferSolDetails.transferOption === "username" &&
		solanaClass.transferSolDetails.isUsernameSelected === false
	) {
		return null
	}
	if (solanaClass.transferSolDetails.transferOption === "publicKey") {
		if (!_.isEqual(solanaClass.transferSolDetails.publicKey.length, 44)) {
			return <>Public Key Must be 44 Characters</>
		} else if (solanaClass.transferSolDetails.doesPublicKeyExist === false) {
			return <>This Public Key Does not Exist on Solana</>
		}
	}

	if (solanaClass.walletBalanceSol === 0) {
		return <>You have no Sol to transfer</>
	}
	return (
		<input
			type="number"
			value={solanaClass.transferSolDetails.solAmount}
			onChange={(e) => solanaClass.updateTransferSolDetails("solAmount", Number(e.target.value))}
			className="border rounded-lg p-2"
			placeholder="Amount"
			max={solanaClass.walletBalanceSol || 0}
			min={0}
			step={0.1}
		/>
	)
}

export default observer(SelectTransferAmount)
