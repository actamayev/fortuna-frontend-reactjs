import _ from "lodash"
import dayjs from "dayjs"

export const dateComparator = (valueA: string, valueB: string): number => {
	const format = "M/D/YY [at] h:mmA"
	const dateA = dayjs(valueA, format)
	const dateB = dayjs(valueB, format)

	return dateA.diff(dateB)
}

export const caseInsensitiveComparator = (valueA: string | null, valueB: string | null): number => {
	if (_.isNull(valueA) && _.isNull(valueB)) {
		return 0
	}
	if (_.isNull(valueA)) return -1
	if (_.isNull(valueB)) return 1
	return valueA.toLowerCase().localeCompare(valueB.toLowerCase())
}

export const numberComparator = (valueA: number, valueB: number): number => {
	return valueA - valueB
}
