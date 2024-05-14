import dayjs from "dayjs"

export default function formatReadableDate(date: Date): string {
	return dayjs(date).format("M/D/YY [at] h:mmA")
}
