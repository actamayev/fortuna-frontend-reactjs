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
		return solanaClass.transferSolDetails.publicKey
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferSolDetails.publicKey])

	const doesPublicKeyExist = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.transferSolDetails.doesPublicKeyExist
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferSolDetails.doesPublicKeyExist])

	const isPublicKeySearchLoading = useMemo(() => {
		if (_.isNull(solanaClass)) return false
		return solanaClass.isPublicKeySearchLoading
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.isPublicKeySearchLoading])

	const updateTransferSolDetails = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (_.isNull(solanaClass)) return false
		solanaClass.updateTransferSolDetails("publicKey", handleTypePublicKey(e))
	}, [handleTypePublicKey, solanaClass])

	return (
		<>
			<div className="relative border rounded-lg">
				<input
					type="text"
					value={publicKey}
					onChange={updateTransferSolDetails}
					className="p-2 rounded-lg w-full"
					placeholder="123XYZ"
				/>
				{doesPublicKeyExist && (
					<span className="absolute inset-y-0 right-0 flex items-center pr-3">
						✓
					</span>
				)}
			</div>
			{isPublicKeySearchLoading && (<>Loading...</>)}
		</>
	)
}

export default observer(PublicKeySearch)
