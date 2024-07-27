import _ from "lodash"
import { useCallback } from "react"

export function useNumberWithCommasRounded(): (
	number: number
) => { dollars: string, cents: string } {
	return useCallback((number: number) => {
		const formattedNumber = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
		const [dollars, cents] = formattedNumber.split(".")
		return { dollars, cents }
	}, [])
}

export function useNumberWithCommasFixed(): (
	number: number | null,
	fixToDigits: number
) => { dollars: string, cents: string } {
	return useCallback((
		number: number | null,
		fixToDigits: number
	) => {
		if (_.isNull(number)) return { dollars: "0", cents: "0" }
		const formatted = new Intl.NumberFormat(
			"en-US", { minimumFractionDigits: fixToDigits, maximumFractionDigits: fixToDigits }
		).format(number)
		const [dollars, cents] = formatted.split(".")
		return { dollars, cents }
	}, [])
}
