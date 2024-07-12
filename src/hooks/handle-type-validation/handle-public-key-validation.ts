import { useCallback } from "react"

export default function useHandleTypePublicKey(): (event: React.ChangeEvent<HTMLInputElement>) => string {
	return useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const newValue = event.target.value
			// Regex to remove any characters not included in the Base58 character set
			const sanitizedValue = newValue.replace(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]/g, "")
			return sanitizedValue
		} catch (error) {
			console.error(error)
			return ""
		}
	}, [])
}
