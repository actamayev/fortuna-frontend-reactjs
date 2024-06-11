export default function numberWithCommas (number: number): string {
	return new Intl.NumberFormat("en-US").format(number)
}
