import _ from "lodash"
import { observer } from "mobx-react"
import UsernameSearch from "./username-search"
import PublicKeySearch from "./public-key-search"
import { useSolanaContext } from "../../../../contexts/solana-context"

function OptionsToTransferMoneyBy() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			{solanaClass.moneyTransferDetails.transferOption === "username" && <UsernameSearch />}

			{solanaClass.moneyTransferDetails.transferOption === "publicKey" && <PublicKeySearch />}
		</>
	)
}

export default observer(OptionsToTransferMoneyBy)
