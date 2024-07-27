import { useMemo } from "react"
import { observer } from "mobx-react"
import UsernameSearch from "./username-search"
import PublicKeySearch from "./public-key-search"
import { useSolanaContext } from "../../../../contexts/solana-context"

function OptionsToTransferMoneyBy() {
	const solanaClass = useSolanaContext()

	const transferOption = useMemo(() => {
		return solanaClass.moneyTransferDetails.transferOption
	}, [solanaClass.moneyTransferDetails.transferOption])

	return (
		<>
			{transferOption === "username" && <UsernameSearch />}
			{transferOption === "publicKey" && <PublicKeySearch />}
		</>
	)
}

export default observer(OptionsToTransferMoneyBy)
