import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import DisplayUsernames from "./display-usernames"
import { useSolanaContext } from "../../../contexts/solana-context"
import useUsernameSearch from "../../../hooks/search/username-search"

function UsernameSearch() {
	const [isLoading, setIsLoading] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<{ username: string }[]>([])
	const solanaClass = useSolanaContext()
	const usernameSearch = useUsernameSearch()

	useEffect(() => {
		void usernameSearch(setIsLoading, setUsernameSearchResults)
	}, [usernameSearch])

	if (_.isNull(solanaClass)) return null

	return (
		<>
			<div className="relative border rounded-lg">
				<input
					type="text"
					value={solanaClass.transferSolDetails.username}
					onChange={(e) => {
						solanaClass.updateTransferSolDetails("username", e.target.value)
						solanaClass.updateTransferSolDetails("isUsernameSelected", false)
					}}
					className="p-2 rounded-lg w-full"
					placeholder="Username"
				/>
				{solanaClass.transferSolDetails.isUsernameSelected && (
					<span className="absolute inset-y-0 right-0 flex items-center pr-3">
						✓
					</span>
				)}
			</div>
			<DisplayUsernames
				isLoading={isLoading}
				usernameSearchResults={usernameSearchResults}
			/>
		</>
	)
}

export default observer(UsernameSearch)
