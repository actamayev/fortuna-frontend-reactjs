import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"
import usePublicKeySearch from "../../../hooks/search/public-key-search"

function PublicKeySearch() {
	const [isLoading, setIsLoading] = useState(false)
	const solanaClass = useSolanaContext()
	const publicKeySearch = usePublicKeySearch()

	useEffect(() => {
		void publicKeySearch(setIsLoading)
	}, [publicKeySearch])

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<div className="relative border rounded-lg">
				<input
					type="text"
					value={solanaClass.transferSolDetails.publicKey}
					onChange={(e) => solanaClass.updateTransferSolDetails("publicKey", e.target.value)}
					className="p-2 rounded-lg w-full"
					placeholder="123XYZ"
				/>
				{solanaClass.transferSolDetails.doesPublicKeyExist && (
					<span className="absolute inset-y-0 right-0 flex items-center pr-3">
						✓
					</span>
				)}
			</div>
			{isLoading && (<>Loading...</>)}
		</>
	)
}

export default observer(PublicKeySearch)
