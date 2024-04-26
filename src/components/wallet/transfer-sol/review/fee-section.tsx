import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"

function FeeSection() {
	const solanaClass = useSolanaContext()
	const personalInfoClass = usePersonalInfoContext()
	if (_.isNull(personalInfoClass) || _.isNull(solanaClass)) return null

	if (
		solanaClass.transferSolDetails.transferOption === "publicKey" &&
		solanaClass.transferSolDetails.isPublicKeyRegisteredWithFortuna === false
	) {
		return <>Variable Fee (depends on network traffic)</>
	}
	if (personalInfoClass.getDefaultCurrency() === "sol") {
		return <>0 SOL (internal transfer)</>
	}
	return <>$0.00 (internal transfer)</>

}

export default observer(FeeSection)
