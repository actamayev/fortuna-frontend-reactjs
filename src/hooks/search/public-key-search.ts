import _ from "lodash"
import { useCallback } from "react"
import { PublicKey } from "@solana/web3.js"
import { isErrorResponses } from "../../utils/type-checks"
import { useSolanaContext } from "../../contexts/solana-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function usePublicKeySearch(): () => Promise<void> {
	const solanaClass = useSolanaContext()
	const fortunaApiClient = useApiClientContext()

	return useCallback(async () => {
		if (_.isNull(solanaClass)) return
		try {
			if (!_.isEqual(solanaClass.moneyTransferDetails.publicKey.length, 44)) return
			solanaClass.setIsPublicKeySearchLoading(true)
			solanaClass.updateMoneyTransferDetails("doesPublicKeyExist", false)
			solanaClass.updateMoneyTransferDetails("isPublicKeyRegisteredWithFortuna", false)

			const doesPublicKeyExistOnSolana = PublicKey.isOnCurve(solanaClass.moneyTransferDetails.publicKey)
			if (doesPublicKeyExistOnSolana === false) return
			solanaClass.updateMoneyTransferDetails("doesPublicKeyExist", true)

			const publicKeyOnFortunaResponse = await fortunaApiClient.searchDataService.checkIfPublicKeyRegisteredOnFortuna(
				solanaClass.moneyTransferDetails.publicKey
			)
			if (!_.isEqual(publicKeyOnFortunaResponse.status, 200) || isErrorResponses(publicKeyOnFortunaResponse.data)) {
				throw new Error("Public Key Search Search Failed")
			}
			if (publicKeyOnFortunaResponse.data.exists === true) {
				solanaClass.updateMoneyTransferDetails("doesPublicKeyExist", true)
				solanaClass.updateMoneyTransferDetails("isPublicKeyRegisteredWithFortuna", true)
				return
			}
		} catch (error) {
			console.error(error)
		} finally {
			solanaClass.setIsPublicKeySearchLoading(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.moneyTransferDetails.publicKey, fortunaApiClient.searchDataService])
}
