import _ from "lodash"
import { observer } from "mobx-react"
import SingleUsernameSearch from "./single-username-search"
import { useSolanaContext } from "../../../../contexts/solana-context"

interface Props {
	isLoading: boolean
	usernameSearchResults: { username: string }[]
}

function DisplayUsernames(props: Props) {
	const { isLoading, usernameSearchResults } = props
	const solanaClass = useSolanaContext()

	if (_.isNull(solanaClass)) return null
	if (isLoading === true) return <>Loading...</>
	if (solanaClass.transferSolDetails.isUsernameSelected === true) return null

	return (
		<>
			{usernameSearchResults.map((item) => {
				return (
					<SingleUsernameSearch
						key = {item.username}
						searchResultsUsername={item.username}
					/>
				)
			})}
		</>
	)
}

export default observer(DisplayUsernames)
