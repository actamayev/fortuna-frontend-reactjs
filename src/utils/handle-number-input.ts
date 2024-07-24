export function handleMinNumberInput(
	event: React.ChangeEvent<HTMLInputElement>,
	minNumber: number
): number {
	try {
		const inputValue = event.target.value

		// Ensure the value is a number
		const numericValue = parseFloat(inputValue)

		// If the value is NaN (e.g., empty input) or less than minNumber, set it to minNumber
		if (isNaN(numericValue) || numericValue < minNumber) {
			return minNumber
		}

		return numericValue
	} catch (error) {
		console.error(error)
		return minNumber
	}
}

export function handleBoundedNumberInput(
	event: React.ChangeEvent<HTMLInputElement>,
	minNumber: number,
	maxNumber: number
): number {
	try {
		const inputValue = event.target.value

		// Ensure the value is a number and round to 2 decimal points
		let numericValue = parseFloat(inputValue)

		if (isNaN(numericValue)) numericValue = minNumber

		// Ensure the value is within the bounds
		if (numericValue < minNumber) {
			return parseFloat(minNumber.toFixed(2))
		}

		if (numericValue > maxNumber) {
			return parseFloat(maxNumber.toFixed(2))
		}

		// Round to 2 decimal points
		return parseFloat(numericValue.toFixed(2))
	} catch (error) {
		console.error(error)
		return parseFloat(minNumber.toFixed(2))
	}
}
