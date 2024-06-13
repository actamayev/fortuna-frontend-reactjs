import _ from "lodash"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

function FeeSection() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (_.isNull(solanaClass)) return null

	if (
		solanaClass.transferSolDetails.transferOption === "publicKey" &&
		solanaClass.transferSolDetails.isPublicKeyRegisteredWithFortuna === false
	) {
		return <>Variable (depends on network traffic)</>
	}

	if (defaultCurrency === "sol") {
		return <>0 SOL (internal transfer)</>
	}

	return <>$0.00 (internal transfer)</>
}

export default observer(FeeSection)
