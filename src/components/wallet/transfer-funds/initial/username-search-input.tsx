/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useHandleTypeUsername from "../../../../hooks/handle-type-validation/handle-type-username"

function UsernameSearchInput() {
	const solanaClass = useSolanaContext()
	const handleTypeUsername = useHandleTypeUsername()

	const transferSolUsername = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.transferFundsDetails.username
	}, [solanaClass, solanaClass?.transferFundsDetails.username])

	const isUsernameSelected = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.transferFundsDetails.isUsernameSelected
	}, [solanaClass, solanaClass?.transferFundsDetails.isUsernameSelected])

	const updateTransferFundsDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferFundsDetails("username", handleTypeUsername(e))
		solanaClass.updateTransferFundsDetails("isUsernameSelected", false)
	}, [solanaClass, handleTypeUsername])

	return (
		<div className="relative border rounded-lg">
			<input
				type="text"
				value={transferSolUsername}
				onChange={updateTransferFundsDetails}
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
