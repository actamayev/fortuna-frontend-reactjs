export default function cleanVideoTag(rawVideoTag: string): string {
	try {
		const sanitizedValue = rawVideoTag.replace(/[#?&/@]/g, "")
		return sanitizedValue.slice(0, 50)
	} catch (error) {
		console.error(error)
		return ""
	}
}
