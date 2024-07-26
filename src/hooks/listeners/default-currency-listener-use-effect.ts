import { useCallback, useEffect } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useDefaultCurrencyListenerUseEffect(): void {
	const personalInfoClass = usePersonalInfoContext()

	const handleStorageChange = useCallback((event: StorageEvent): void => {
		if (
			event.key !== "defaultCurrency" ||
			(event.newValue !== "sol" && event.newValue !== "usd")
		) return
		personalInfoClass.setDefaultCurrency(event.newValue, false)
	}, [personalInfoClass])

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [handleStorageChange])
}
