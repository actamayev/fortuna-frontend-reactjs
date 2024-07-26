import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useDefaultCurrency from "../../../../hooks/memos/default-currency"

function FeeSection() {
	const solanaClass = useSolanaContext()
	const defaultCurrency = useDefaultCurrency()

	if (
		solanaClass.moneyTransferDetails.transferOption === "publicKey" &&
		solanaClass.moneyTransferDetails.isPublicKeyRegisteredWithFortuna === false
	) {
		return <>Variable (depends on network traffic)</>
	}

	if (defaultCurrency === "sol") {
		return <>0 SOL (internal transfer)</>
	}

	return <>$0.00 (internal transfer)</>
}

export default observer(FeeSection)
