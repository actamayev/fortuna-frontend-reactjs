import _ from "lodash"
import { observer } from "mobx-react"
import RangeSelectorSlider from "../../../range-selector-slider"
import { useSolanaContext } from "../../../../contexts/solana-context"

// TODO: show the $ amount side by side, and allow the user to enter either dollar or sol amounts
// (and the other should adjust automatically)
// Instead, jut have the user enter in whichever currency they want (default currency)
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
		<div className="flex flex-col space-y-4">
			<RangeSelectorSlider
				title=""
				value={solanaClass.transferSolDetails.solAmount}
				onChange={(e) => solanaClass.updateTransferSolDetails("solAmount", Number(e.target.value))}
				min={0}
				max={solanaClass.walletBalanceSol || 0}
				step={0.01}
			/>
			{solanaClass.transferSolDetails.solAmount} Sol
		</div>
	)
}

export default observer(SelectTransferAmount)
