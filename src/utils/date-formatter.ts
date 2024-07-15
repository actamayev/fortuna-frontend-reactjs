import dayjs from "dayjs"
import { useCallback } from "react"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(localizedFormat)

export function useActualDateFormatter(): (dateInput: Date) => string {
	return useCallback((dateInput: Date): string => {
		const date = dayjs(dateInput)

		return date.format("MMMM D, YYYY")
	}, [])
}

export function useFormatGBDate(): (dateInput: string | Date) => string {
	return useCallback((dateInput: string | Date): string => {
		// Ensure the input is a Date object
		const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput

		const day = date.getDate()
		const month = date.toLocaleString("default", { month: "short" })
		const year = date.getFullYear()

		return `${day} ${month} ${year}`
	}, [])
}

export function useRelativeDateFormatter(): (dateInput: Date) => string {
	// eslint-disable-next-line complexity
	return useCallback((dateInput: Date): string => {
		const date = dayjs(dateInput)
		const now = dayjs()
		const diffInMinutes = now.diff(date, "minute")
		const diffInHours = now.diff(date, "hour")
		const diffInDays = now.diff(date, "day")
		const diffInWeeks = now.diff(date, "week")
		const diffInMonths = now.diff(date, "month")
		const diffInYears = now.diff(date, "year")

		if (diffInMinutes < 60) {
			if (diffInMinutes === 0) return "Just uplaoded"
			return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
		} else if (diffInHours < 24) {
			return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
		} else if (diffInDays < 14) {
			return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
		} else if (diffInWeeks < 4) {
			return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`
		} else if (diffInMonths < 12) {
			const months = now.month() - date.month() + (now.year() - date.year()) * 12
			return `${months} month${months > 1 ? "s" : ""} ago`
		} else {
			return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`
		}
	}, [])
}
