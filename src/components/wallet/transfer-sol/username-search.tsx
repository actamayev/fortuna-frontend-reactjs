import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import DisplayUsernames from "./display-usernames"
import { isErrorResponses } from "../../../utils/type-checks"
import { useSolanaContext } from "../../../contexts/solana-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

function UsernameSearch() {
	const [isLoading, setIsLoading] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<{username: string}[]>([])
	const fortunaApiClient = useApiClientContext()
	const solanaClass = useSolanaContext()

	const handleSearch = useCallback(async () => {
		try {
			if (_.isNull(solanaClass)) return
			if (_.isEmpty(solanaClass.transferSolDetails.username.trim()) || solanaClass.transferSolDetails.isUsernameSelected === true) {
				setUsernameSearchResults([])
				return
			}
			setIsLoading(true)

			const response = await fortunaApiClient.searchDataService.searchForUsername(solanaClass.transferSolDetails.username)
			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				throw new Error("User Search Failed")
			}
			console.log(response.data)
			setUsernameSearchResults(response.data.usernames)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fortunaApiClient.searchDataService, solanaClass?.transferSolDetails.isUsernameSelected, solanaClass?.transferSolDetails.username])

	useEffect(() => {
		void handleSearch()
	}, [handleSearch])

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
