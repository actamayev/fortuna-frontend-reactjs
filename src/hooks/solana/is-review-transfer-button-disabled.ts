import _ from "lodash"
import { useObserver } from "mobx-react"
import { useSolanaContext } from "../../contexts/solana-context"

export default function useIsReviewTransferButtonDisabled(): boolean {
	const solanaClass = useSolanaContext()

	return useObserver(() => {
		if (_.isEqual(solanaClass.moneyTransferDetails.transferAmount, 0)) return true
		if (
			solanaClass.moneyTransferDetails.transferOption === "username" &&
			solanaClass.moneyTransferDetails.isUsernameSelected === false
		) return true
		if (_.isNull(solanaClass.walletPublicKey)) return true
		if (
			solanaClass.moneyTransferDetails.transferOption === "publicKey" &&
			(
				solanaClass.moneyTransferDetails.doesPublicKeyExist === false ||
				solanaClass.moneyTransferDetails.publicKey === solanaClass.walletPublicKey.toString())
		) {
			return true
		}
		return false
	})
}
