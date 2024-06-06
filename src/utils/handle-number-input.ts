export function handleMaxNumberInput(
	event: React.ChangeEvent<HTMLInputElement>,
	maxNumber: number
): number {
	try {
		const inputValue = event.target.value

		// Ensure the value is a number
		const numericValue = parseInt(inputValue, 10)

		// If the value is greater than maxNumber, set it to maxNumber
		const limitedValue = numericValue > maxNumber ? maxNumber : numericValue

		return limitedValue
	} catch (error) {
		console.error(error)
		return 0
	}
}

export function handleMinNumberInput(
	event: React.ChangeEvent<HTMLInputElement>,
	minNumber: number
): number {
	try {
		const inputValue = event.target.value

		// Ensure the value is a number
		const numericValue = parseInt(inputValue, 10)

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

		// Ensure the value is a number
		const numericValue = parseInt(inputValue, 10)

		// If the value is NaN (e.g., empty input) or less than minNumber, set it to minNumber
		if (isNaN(numericValue) || numericValue < minNumber) {
			return minNumber
		}

		// If the value is greater than maxNumber, set it to maxNumber
		if (numericValue > maxNumber) {
			return maxNumber
		}

		return numericValue
	} catch (error) {
		console.error(error)
		return minNumber
	}
}
