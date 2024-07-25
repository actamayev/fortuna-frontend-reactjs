import _ from "lodash"

export function numberWithCommasRounded(number: number): { dollars: string, cents: string } {
	const formattedNumber = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
	const [dollars, cents] = formattedNumber.split(".")
	return { dollars, cents }
}

export function numberWithCommasFixed(number: number | null, fixToDigits: number): { dollars: string, cents: string } {
	if (_.isNull(number)) return { dollars: "0", cents: "0" }
	const formattedNumber = new Intl.NumberFormat(
		"en-US", { minimumFractionDigits: fixToDigits, maximumFractionDigits: fixToDigits }
	).format(number)
	const [dollars, cents] = formattedNumber.split(".")
	return { dollars, cents }
}
