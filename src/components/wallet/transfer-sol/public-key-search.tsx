import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useSolanaContext } from "../../../contexts/solana-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

function PublicKeySearch() {
	const [isLoading, setIsLoading] = useState(false)
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	// eslint-disable-next-line complexity
	const handleSearch = useCallback(async () => {
		try {
			if (_.isNull(solanaClass) || !_.isEqual(solanaClass.transferSolDetails.publicKey.length, 44)) return
			setIsLoading(true)
			solanaClass.updateTransferSolDetails("doesPublicKeyExist", false)

			const publicKeyOnFortunaResponse = await fortunaApiClient.searchDataService.checkIfPublicKeyRegisteredOnFortuna(
				solanaClass.transferSolDetails.publicKey
			)
			if (!_.isEqual(publicKeyOnFortunaResponse.status, 200) || isErrorResponses(publicKeyOnFortunaResponse.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyOnFortunaResponse.data.exists === true) {
				solanaClass.updateTransferSolDetails("doesPublicKeyExist", true)
				return
			}

			const publicKeyExistsOnSolana = await fortunaApiClient.searchDataService.checkIfPublicKeyExistsOnSolana(solanaClass.transferSolDetails.publicKey)
			if (!_.isEqual(publicKeyExistsOnSolana.status, 200) || isErrorResponses(publicKeyExistsOnSolana.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyExistsOnSolana.data.exists === true) {
				solanaClass.updateTransferSolDetails("doesPublicKeyExist", true)
				return
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fortunaApiClient.searchDataService, solanaClass?.transferSolDetails.publicKey])

	useEffect(() => {
		void handleSearch()
	}, [handleSearch])

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
