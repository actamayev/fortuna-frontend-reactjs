import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useSolanaContext } from "../../../../contexts/solana-context"

interface Props {
	searchResultsUsername: string
}

function SingleUsernameSearch(props: Props) {
	const { searchResultsUsername } = props
	const solanaClass = useSolanaContext()

	const selectUsername = useCallback(() => {
		if (_.isNull(solanaClass)) return
		solanaClass.updateTransferSolDetails("isUsernameSelected", true)
		solanaClass.updateTransferSolDetails("username", searchResultsUsername)
	}, [solanaClass, searchResultsUsername])

	return (
		<div>
			<span
				onClick={selectUsername}
				className="hover:underline cursor-pointer"
			>
				{searchResultsUsername}
			</span>
		</div>
	)
}

export default observer(SingleUsernameSearch)
