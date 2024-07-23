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

export function useDateTimeFormatter(): (dateInput: Date) => string {
	return useCallback((dateInput: Date): string => {
		const date = dayjs(dateInput)

		return date.format("MMMM D, YYYY h:mm A")
	}, [])
}

export function useAbbreviatedDateFormatter(): (dateInput: Date) => string {
	return useCallback((dateInput: Date): string => {
		const date = dayjs(dateInput)
		return date.format("MMM D, YYYY")
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


export function useFormatDuration(): (seconds: number) => string {
	return useCallback((seconds: number): string => {
		const roundedSeconds = Math.round(seconds)
		const hours = Math.floor(roundedSeconds / 3600)
		const minutes = Math.floor((roundedSeconds % 3600) / 60)
		const secs = roundedSeconds % 60

		const hoursDisplay = hours > 0 ? `${hours}:` : ""
		const minutesDisplay = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes)
		const secondsDisplay = String(secs).padStart(2, "0")

		return `${hoursDisplay}${minutesDisplay}:${secondsDisplay}`
	}, [])
}
