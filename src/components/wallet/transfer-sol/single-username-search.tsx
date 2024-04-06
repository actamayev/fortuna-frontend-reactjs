import { useCallback } from "react"

interface Props {
	username: string
	transferSolDetails: TransferSolDetails
	setTransferSolDetails: React.Dispatch<React.SetStateAction<TransferSolDetails>>
}

export default function SingleUsernameSearch(props: Props) {
	const { username, transferSolDetails, setTransferSolDetails } = props

	const selectUsername = useCallback(() => {
		setTransferSolDetails({
			...transferSolDetails,
			isUsernameSelected: true,
			username
		})
	}, [setTransferSolDetails, transferSolDetails, username])

	return (
		<div onClick={selectUsername}>
			{username}
		</div>
	)
}
