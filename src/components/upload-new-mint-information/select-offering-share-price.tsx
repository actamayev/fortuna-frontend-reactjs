import FormGroup from "../form-group"

interface Props {
	splDetails: NewSPLDetails
	setNewSplDetails: React.Dispatch<React.SetStateAction<NewSPLDetails>>
}

export default function SelectOfferingSharePrice(props: Props) {
	const { splDetails, setNewSplDetails } = props

	return (
		<FormGroup
			label = "Offering price per share ($)"
			type = "number"
			placeholder = "10"
			onChange = {(event) => setNewSplDetails({ ...splDetails, offeringSharePriceSol: Number(event.target.value) })}
			required
			value = {splDetails.offeringSharePriceSol.toString()}
		/>
	)
}
