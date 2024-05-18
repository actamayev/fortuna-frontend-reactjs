import { useCallback } from "react"

export default function useHandleTypeUsername(): (
	event: React.ChangeEvent<HTMLInputElement>
) => string {
	const handleTypeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const newValue = event.target.value
			// Regex to remove any #, ?, &, / characters
			const sanitizedValue = newValue.replace(/[#?&/@]/g, "")
			return sanitizedValue
		} catch (error) {
			console.error(error)
			return ""
		}
	}, [])

	return handleTypeUsername
}
