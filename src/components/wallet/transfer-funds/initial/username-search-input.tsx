import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useHandleTypeUsername from "../../../../hooks/handle-type-validation/handle-type-username"

function UsernameSearchInput() {
	const solanaClass = useSolanaContext()
	const handleTypeUsername = useHandleTypeUsername()

	const transferSolUsername = useMemo(() => {
		return solanaClass.moneyTransferDetails.username
	}, [solanaClass.moneyTransferDetails.username])

	const isUsernameSelected = useMemo(() => {
		return solanaClass.moneyTransferDetails.isUsernameSelected
	}, [solanaClass.moneyTransferDetails.isUsernameSelected])

	const updateMoneyTransferDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		solanaClass.updateMoneyTransferDetails("username", handleTypeUsername(e))
		solanaClass.updateMoneyTransferDetails("isUsernameSelected", false)
	}, [solanaClass, handleTypeUsername])

	return (
		<div className="relative border rounded-lg">
			<input
				type="text"
				value={transferSolUsername}
				onChange={updateMoneyTransferDetails}
				className="p-2 rounded-lg w-full text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 outline-none"
				placeholder="Username"
			/>
			{isUsernameSelected && (
				<span className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-800 dark:text-zinc-200">
					✓
				</span>
			)}
		</div>
	)
}

export default observer(UsernameSearchInput)
