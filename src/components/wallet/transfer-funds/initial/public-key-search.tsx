/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo } from "react"
import { useSolanaContext } from "../../../../contexts/solana-context"
import usePublicKeySearch from "../../../../hooks/search/public-key-search"
import useHandleTypePublicKey from "../../../../hooks/handle-type-validation/handle-public-key-validation"

function PublicKeySearch() {
	const solanaClass = useSolanaContext()
	const publicKeySearch = usePublicKeySearch()
	const handleTypePublicKey = useHandleTypePublicKey()

	useEffect(() => {
		void publicKeySearch()
	}, [publicKeySearch])

	const publicKey = useMemo(() => {
		if (_.isNull(solanaClass)) return ""
		return solanaClass.moneyTransferDetails.publicKey
	}, [solanaClass, solanaClass?.moneyTransferDetails.publicKey])

	const isPublicKeySearchLoading = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.isPublicKeySearchLoading
	}, [solanaClass, solanaClass?.isPublicKeySearchLoading])

	const updateMoneyTransferDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return false
		solanaClass.updateMoneyTransferDetails("publicKey", handleTypePublicKey(e))
	}, [handleTypePublicKey, solanaClass])

	return (
		<>
			<div className="relative border rounded-lg">
				<input
					type="text"
					value={publicKey}
					onChange={updateMoneyTransferDetails}
					className="p-2 rounded-lg w-full text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 outline-none"
					placeholder="123XYZ"
				/>
			</div>
			{isPublicKeySearchLoading && (<span>Loading...</span>)}
		</>
	)
}

export default observer(PublicKeySearch)
