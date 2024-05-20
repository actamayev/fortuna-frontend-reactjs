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
		return solanaClass.transferSolDetails.username
	}, [solanaClass, solanaClass?.transferSolDetails.username])

	const isUsernameSelected = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.transferSolDetails.isUsernameSelected
	}, [solanaClass, solanaClass?.transferSolDetails.isUsernameSelected])

	const updateTransferSolDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferSolDetails("username", handleTypeUsername(e))
		solanaClass.updateTransferSolDetails("isUsernameSelected", false)
	}, [solanaClass, handleTypeUsername])

	return (
		<div className="relative border rounded-lg">
			<input
				type="text"
				value={transferSolUsername}
				onChange={updateTransferSolDetails}
				className="p-2 rounded-lg w-full"
				placeholder="Username"
			/>
			{isUsernameSelected && (
				<span className="absolute inset-y-0 right-0 flex items-center pr-3">
					✓
				</span>
			)}
		</div>
	)
}

export default observer(UsernameSearchInput)
