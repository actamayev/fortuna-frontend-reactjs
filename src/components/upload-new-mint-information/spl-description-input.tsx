import FormGroup from "../form-group"

interface Props {
	splDetails: NewSPLDetails
	setNewSplDetails: React.Dispatch<React.SetStateAction<NewSPLDetails>>
}

export default function SPLDescriptionInput(props: Props) {
	const { splDetails, setNewSplDetails } = props

	return (
		<FormGroup
			label = "Token Description"
			type = "text"
			placeholder = "Charlie bit my finger really hard"
			onChange = {(event) => setNewSplDetails({ ...splDetails, description: event.target.value })}
			required
			value = {splDetails.description || ""}
		/>
	)
}
