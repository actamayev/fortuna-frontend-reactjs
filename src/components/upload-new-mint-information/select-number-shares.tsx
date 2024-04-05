import FormGroup from "../form-group"

interface Props {
	splDetails: NewSPLDetails
	setNewSplDetails: React.Dispatch<React.SetStateAction<NewSPLDetails>>
}

export default function SelectNumberShares(props: Props) {
	const { splDetails, setNewSplDetails } = props

	return (
		<FormGroup
			label = "Number of Shares"
			type = "number"
			placeholder = "1000"
			onChange = {(event) => setNewSplDetails({ ...splDetails, numberOfShares: Number(event.target.value) })}
			required
			value = {splDetails.numberOfShares.toString()}
		/>
	)
}
