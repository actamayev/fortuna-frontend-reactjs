import { useCallback } from "react"

export default function useHandleTypePublicKey(): (
	event: React.ChangeEvent<HTMLInputElement>
) => string {

	const handleTypePublicKey = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value
		// Regex to remove any characters not included in the Base58 character set
		const sanitizedValue = newValue.replace(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]/g, "")
		return sanitizedValue
	}, [])

	return handleTypePublicKey
}
