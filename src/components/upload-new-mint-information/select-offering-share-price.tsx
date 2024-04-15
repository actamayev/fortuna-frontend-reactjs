import FormGroup from "../form-group"

interface Props {
	splDetails: NewSPLDetails
	setNewSplDetails: React.Dispatch<React.SetStateAction<NewSPLDetails>>
}

export default function SelectOfferingSharePrice(props: Props) {
	const { splDetails, setNewSplDetails } = props

	// TODO: Make an option to enter in dollars (maybe have two boxes, each of which influences the other when changed)
	return (
		<FormGroup
			label = "Offering price per share (Sol)"
			type = "number"
			placeholder = "1"
			onChange = {(event) => setNewSplDetails({ ...splDetails, offeringSharePriceSol: Number(event.target.value) })}
			required
			value = {splDetails.offeringSharePriceSol.toString()}
		/>
	)
}
