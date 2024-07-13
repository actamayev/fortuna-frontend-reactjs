export function numberWithCommasRounded(number: number): string {
	return new Intl.NumberFormat("en-US").format(number)
}

export function numberWithCommasFixed(number: number, fixToDigits: number): string {
	return new Intl.NumberFormat("en-US", { minimumFractionDigits: fixToDigits, maximumFractionDigits: fixToDigits }).format(number)
}
