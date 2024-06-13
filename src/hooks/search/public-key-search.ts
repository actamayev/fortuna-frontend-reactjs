import _ from "lodash"
import { useCallback } from "react"
import { PublicKey } from "@solana/web3.js"
import { isErrorResponses } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function usePublicKeySearch(): () => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()

	const publicKeySearch = useCallback(async () => {
		try {
			if (_.isNull(solanaClass) || !_.isEqual(solanaClass.transferFundsDetails.publicKey.length, 44)) return
			solanaClass.setIsPublicKeySearchLoading(true)
			solanaClass.updateTransferFundsDetails("doesPublicKeyExist", false)
			solanaClass.updateTransferFundsDetails("isPublicKeyRegisteredWithFortuna", false)

			const doesPublicKeyExistOnSolana = PublicKey.isOnCurve(solanaClass.transferFundsDetails.publicKey)
			if (doesPublicKeyExistOnSolana === false) return
			solanaClass.updateTransferFundsDetails("doesPublicKeyExist", true)

			const publicKeyOnFortunaResponse = await fortunaApiClient.searchDataService.checkIfPublicKeyRegisteredOnFortuna(
				solanaClass.transferFundsDetails.publicKey
			)
			if (!_.isEqual(publicKeyOnFortunaResponse.status, 200) || isErrorResponses(publicKeyOnFortunaResponse.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyOnFortunaResponse.data.exists === true) {
				solanaClass.updateTransferFundsDetails("doesPublicKeyExist", true)
				solanaClass.updateTransferFundsDetails("isPublicKeyRegisteredWithFortuna", true)
				return
			}
		} catch (error) {
			console.error(error)
		} finally {
			if (!_.isNull(solanaClass)) solanaClass.setIsPublicKeySearchLoading(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.transferFundsDetails.publicKey, fortunaApiClient.searchDataService])

	return publicKeySearch
}
