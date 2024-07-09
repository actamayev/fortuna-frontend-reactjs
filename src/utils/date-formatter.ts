import dayjs from "dayjs"

export function dateFormatter (dateInput: Date): string {
	const date = dayjs(dateInput)
	const today = dayjs()

	if (date.isSame(today, "day")) return "Today"
	return date.format("MMMM D, YYYY")
}

export function formatGBDate(dateInput: string | Date): string {
	// Ensure the input is a Date object
	const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput

	const day = date.getDate()
	const month = date.toLocaleString("default", { month: "short" })
	const year = date.getFullYear()

	return `${day} ${month} ${year}`
}
