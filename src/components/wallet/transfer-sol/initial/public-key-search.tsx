import _ from "lodash"
import { useEffect } from "react"
import { observer } from "mobx-react"
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

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<div className="relative border rounded-lg">
				<input
					type="text"
					value={solanaClass.transferSolDetails.publicKey}
					onChange={(e) => solanaClass.updateTransferSolDetails("publicKey", handleTypePublicKey(e))}
					className="p-2 rounded-lg w-full"
					placeholder="123XYZ"
				/>
				{solanaClass.transferSolDetails.doesPublicKeyExist && (
					<span className="absolute inset-y-0 right-0 flex items-center pr-3">
						✓
					</span>
				)}
			</div>
			{solanaClass.isPublicKeySearchLoading && (<>Loading...</>)}
		</>
	)
}

export default observer(PublicKeySearch)
