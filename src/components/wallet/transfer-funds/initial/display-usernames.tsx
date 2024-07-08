import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import SingleUsernameSearch from "./single-username-search"
import { useSolanaContext } from "../../../../contexts/solana-context"
import useUsernameSearch from "../../../../hooks/search/username-search"

function DisplayUsernames() {
	const solanaClass = useSolanaContext()
	const [isLoading, setIsLoading] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<{ username: string }[]>([])
	const usernameSearch = useUsernameSearch()

	useEffect(() => {
		void usernameSearch(setIsLoading, setUsernameSearchResults)
	}, [usernameSearch])

	if (_.isNull(solanaClass)) return null
	if (isLoading === true) return <>Loading...</>
	if (solanaClass.transferFundsDetails.isUsernameSelected === true) return null

	if (_.isEmpty(usernameSearchResults) && !_.isEmpty(solanaClass.transferFundsDetails.username)) {
		return <>No users found</>
	}

	return (
		<>
			{usernameSearchResults.slice(0, 10).map(usernameResult => (
				<SingleUsernameSearch key={usernameResult.username} searchResultsUsername={usernameResult.username} />
			))}
		</>
	)
}

export default observer(DisplayUsernames)
