import dayjs from "dayjs"
import { useCallback } from "react"

export default function useDateFormatter(): (dateInput: Date) => string {
	const dateFormatter = useCallback((dateInput: Date) => {
		const date = dayjs(dateInput)
		const today = dayjs()

		if (date.isSame(today, "day")) return "Today"
		return date.format("MMMM D, YYYY")
	}, [])

	return dateFormatter
}
