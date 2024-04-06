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
			if (_.isEmpty(transferSolDetails.username.trim()) || transferSolDetails.isUsernameSelected === true) {
				setUsernameSearchResults([])
				return
			}
			setIsLoading(true)

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
	}, [fortunaApiClient.searchDataService, transferSolDetails.isUsernameSelected, transferSolDetails.username])

	useEffect(() => {
		void handleSearch()
	}, [handleSearch])

	return (
		<>
			<div className="relative border rounded-lg">
				<input
					type="text"
					value={transferSolDetails.username}
					onChange={(e) => setTransferSolDetails({ ...transferSolDetails, username: e.target.value, isUsernameSelected: false })}
					className="p-2 rounded-lg w-full"
					placeholder="Username"
				/>
				{transferSolDetails.isUsernameSelected && (
					<span className="absolute inset-y-0 right-0 flex items-center pr-3">
						✓
					</span>
				)}
			</div>
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
