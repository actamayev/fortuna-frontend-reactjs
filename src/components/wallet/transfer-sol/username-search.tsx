import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import DisplayUsernames from "./display-usernames"
import { isErrorResponses } from "../../../utils/type-checks"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

interface Props {
	transferSolDetails: TransferSolDetails
	setTransferSolDetails: React.Dispatch<React.SetStateAction<TransferSolDetails>>
}

function UsernameSearch(props: Props) {
	// TODO: Pass down the setIsUsernameSelected until the single-username-search. onclick, should set the username
	const { transferSolDetails, setTransferSolDetails } = props
	const [isLoading, setIsLoading] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<{username: string}[]>([])
	const fortunaApiClient = useApiClientContext()

	const handleSearch = useCallback(async () => {
		try {
			setIsLoading(true)
			if (_.isEmpty(transferSolDetails.username.trim())) {
				setUsernameSearchResults([])
				return
			}

			const response = await fortunaApiClient.searchDataService.searchForUsername(transferSolDetails.username)
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
	}, [fortunaApiClient.searchDataService, transferSolDetails.username])

	useEffect(() => {
		void handleSearch()
	}, [handleSearch])

	return (
		<>
			<input
				type="text"
				value={transferSolDetails.username}
				onChange={(e) => setTransferSolDetails({ ...transferSolDetails, username: e.target.value})}
				className="border rounded-lg p-2"
				placeholder="Username"
			/>
			<DisplayUsernames
				isLoading={isLoading}
				usernameSearchResults={usernameSearchResults}
				transferSolDetails={transferSolDetails}
				setTransferSolDetails={setTransferSolDetails}
			/>
		</>
	)
}

export default observer(UsernameSearch)
