export default function cleanVideoTag(rawVideoTag: string): string {
	try {
		// Regex to remove any character that is not a letter, a digit, or an underscore
		const sanitizedValue = rawVideoTag.replace(/[^a-zA-Z0-9_]/g, "")
		return sanitizedValue.slice(0, 50)
	} catch (error) {
		console.error(error)
		return ""
	}
}
