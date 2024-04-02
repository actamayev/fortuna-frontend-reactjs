import FormGroup from "../form-group"

interface Props {
	splDetails: NewSPLDetails
	setNewSplDetails: React.Dispatch<React.SetStateAction<NewSPLDetails>>
}

export default function SPLNameInput(props: Props) {
	const { splDetails, setNewSplDetails } = props

	return (
		<FormGroup
			label = "Token Name"
			type = "text"
			placeholder = "Charlie bit my finger"
			onChange = {(event) => setNewSplDetails({ ...splDetails, splName: event.target.value })}
			required
			value = {splDetails.splName || ""}
		/>
	)
}
