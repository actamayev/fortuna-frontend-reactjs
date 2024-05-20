import _ from "lodash"
import { observer } from "mobx-react"
import UsernameSearch from "./username-search"
import PublicKeySearch from "./public-key-search"
import { useSolanaContext } from "../../../../contexts/solana-context"

function TransferSolByOptions() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			{solanaClass.transferSolDetails.transferOption === "username" && <UsernameSearch />}

			{solanaClass.transferSolDetails.transferOption === "publicKey" && <PublicKeySearch />}
		</>
	)
}

export default observer(TransferSolByOptions)
