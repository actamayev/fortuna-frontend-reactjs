import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useSolanaContext } from "../../../../contexts/solana-context"

function SelectTransferOption() {
	const solanaClass = useSolanaContext()

	const transferOption = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.transferSolDetails.transferOption
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferSolDetails.transferOption])

	const updateTransferSolDetails = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferSolDetails("transferOption", e.target.value as TransferOption)
	}, [solanaClass])

	return (
		<select
			value={transferOption}
			onChange={updateTransferSolDetails}
			className="border rounded-lg p-2 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200"
		>
			<option value="username">Username</option>
			<option value="publicKey">Public Key</option>
		</select>
	)
}

export default observer(SelectTransferOption)
