export default function handleInputChange(
	event: React.ChangeEvent<HTMLInputElement>,
	numberToLimitTo: number
): number {
	try {
		const inputValue = event.target.value

		// Ensure the value is a number
		const numericValue = parseInt(inputValue, 10)

		// If the value is greater than numberToLimitTo, set it to numberToLimitTo
		const limitedValue = numericValue > numberToLimitTo ? numberToLimitTo : numericValue

		return limitedValue
	} catch (error) {
		console.error(error)
		return 0
	}
}
