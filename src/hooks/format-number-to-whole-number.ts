import { useCallback } from "react"

export default function useFormatNumberToWholeNumber(): (value: string) => number {
	return useCallback((value: string) => {
		const wholeNumberValue = value.replace(/\D/g, "") // Remove any non-digit characters
		return parseInt(wholeNumberValue, 10)
	}, [])
}
