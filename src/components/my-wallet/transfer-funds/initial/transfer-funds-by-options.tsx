import _ from "lodash"
import { observer } from "mobx-react"
import UsernameSearch from "./username-search"
import PublicKeySearch from "./public-key-search"
import { useSolanaContext } from "../../../../contexts/solana-context"

function TransferFundsByOptions() {
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null

	return (
		<>
			{solanaClass.transferFundsDetails.transferOption === "username" && <UsernameSearch />}

			{solanaClass.transferFundsDetails.transferOption === "publicKey" && <PublicKeySearch />}
		</>
	)
}

export default observer(TransferFundsByOptions)
