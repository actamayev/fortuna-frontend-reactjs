import FormGroup from "../form-group"

interface Props {
	splDetails: NewSPLDetails
	setNewSplDetails: React.Dispatch<React.SetStateAction<NewSPLDetails>>
}

export default function SelectCreatorOwnershipPercentage(props: Props) {
	const { splDetails, setNewSplDetails } = props

	return (
		<FormGroup
			label = "Ownership percentage"
			type = "number"
			placeholder = "69"
			onChange = {(event) => setNewSplDetails({ ...splDetails, creatorOwnershipPercentage: Number(event.target.value) })}
			required
			value = {splDetails.creatorOwnershipPercentage.toString()}
		/>
	)
}
