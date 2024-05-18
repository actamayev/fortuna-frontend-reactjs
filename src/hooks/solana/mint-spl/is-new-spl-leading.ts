import _ from "lodash"
import { useMemo } from "react"
import { useSolanaContext } from "../../../contexts/solana-context"

export default function useIsNewSplLoading(): boolean {
	const solanaClass = useSolanaContext()

	const isNewSplLoading = useMemo(() => {
		if (_.isNull(solanaClass)) return true
		return solanaClass.isNewSplLoading
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solanaClass, solanaClass?.isNewSplLoading])

	return isNewSplLoading
}
