import dayjs from "dayjs"

export default function dateFormatter (dateInput: Date): string {
	const date = dayjs(dateInput)
	const today = dayjs()

	if (date.isSame(today, "day")) return "Today"
	return date.format("MMMM D, YYYY")
}
