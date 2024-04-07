import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function usePublicKeySearch(): (
	setIsLoading: (value: React.SetStateAction<boolean>) => void
) => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()

	// eslint-disable-next-line complexity
	const publicKeySearch = useCallback(async (
		setIsLoading: (value: React.SetStateAction<boolean>) => void
	) => {
		try {
			if (_.isNull(solanaClass) || !_.isEqual(solanaClass.transferSolDetails.publicKey.length, 44)) return
			setIsLoading(true)
			solanaClass.updateTransferSolDetails("doesPublicKeyExist", false)
			solanaClass.updateTransferSolDetails("isPublicKeyRegisteredWithFortuna", false)

			const publicKeyOnFortunaResponse = await fortunaApiClient.searchDataService.checkIfPublicKeyRegisteredOnFortuna(
				solanaClass.transferSolDetails.publicKey
			)
			if (!_.isEqual(publicKeyOnFortunaResponse.status, 200) || isErrorResponses(publicKeyOnFortunaResponse.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyOnFortunaResponse.data.exists === true) {
				solanaClass.updateTransferSolDetails("doesPublicKeyExist", true)
				solanaClass.updateTransferSolDetails("isPublicKeyRegisteredWithFortuna", true)
				return
			}

			solanaClass.updateTransferSolDetails("isPublicKeyRegisteredWithFortuna", false)
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

	return publicKeySearch
}
