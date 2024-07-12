import _ from "lodash"
import { useObserver } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"

export default function useIsReviewTransferButtonDisabled(): boolean {
	const solanaClass = useSolanaContext()

	return useObserver(() => {
		if (_.isNull(solanaClass)) return true
		if (_.isEqual(solanaClass.transferFundsDetails.transferAmount, 0)) return true
		if (
			solanaClass.transferFundsDetails.transferOption === "username" &&
			solanaClass.transferFundsDetails.isUsernameSelected === false
		) return true
		if (_.isNull(solanaClass.walletPublicKey)) return true
		if (
			solanaClass.transferFundsDetails.transferOption === "publicKey" &&
			(
				solanaClass.transferFundsDetails.doesPublicKeyExist === false ||
				solanaClass.transferFundsDetails.publicKey === solanaClass.walletPublicKey.toString())
		) {
			return true
		}
		return false
	})
}
