import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useSolanaContext } from "../../../../contexts/solana-context"

function SelectTransferOption() {
	const solanaClass = useSolanaContext()

	const transferOption = useMemo(() => {
		return solanaClass.moneyTransferDetails.transferOption
	}, [solanaClass.moneyTransferDetails.transferOption])

	const updateMoneyTransferDetails = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		solanaClass.updateMoneyTransferDetails("transferOption", e.target.value as TransferOption)
	}, [solanaClass])

	return (
		<select
			value={transferOption}
			onChange={updateMoneyTransferDetails}
			className="border rounded-lg p-2 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 outline-none"
		>
			<option value="username">Username</option>
			<option value="publicKey">Public Key</option>
		</select>
	)
}

export default observer(SelectTransferOption)
