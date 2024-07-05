import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useSolanaContext } from "../../../../contexts/solana-context"

function SelectTransferOption() {
	const solanaClass = useSolanaContext()

	const transferOption = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.transferFundsDetails.transferOption
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferFundsDetails.transferOption])

	const updateTransferFundsDetails = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferFundsDetails("transferOption", e.target.value as TransferOption)
	}, [solanaClass])

	return (
		<select
			value={transferOption}
			onChange={updateTransferFundsDetails}
			className="border rounded-lg p-2 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 outline-none"
		>
			<option value="username">Username</option>
			<option value="publicKey">Public Key</option>
		</select>
	)
}

export default observer(SelectTransferOption)
