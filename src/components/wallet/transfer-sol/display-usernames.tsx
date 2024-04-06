import SingleUsernameSearch from "./single-username-search"

interface Props {
	isLoading: boolean
	usernameSearchResults: { username: string }[]
	transferSolDetails: TransferSolDetails
	setTransferSolDetails: React.Dispatch<React.SetStateAction<TransferSolDetails>>
}

// TODO: Move transferSolDetails onto the context level to not have to pass around as a prop

export default function DisplayUsernames(props: Props) {
	const { isLoading, usernameSearchResults, transferSolDetails, setTransferSolDetails } = props

	if (transferSolDetails.isUsernameSelected === true) return null
	if (isLoading === true) return <>Loading...</>

	return (
		<>
			{usernameSearchResults.map((item) => {
				return (
					<SingleUsernameSearch
						key = {item.username}
						username={item.username}
						transferSolDetails={transferSolDetails}
						setTransferSolDetails={setTransferSolDetails}
					/>
				)
			})}
		</>
	)
}
