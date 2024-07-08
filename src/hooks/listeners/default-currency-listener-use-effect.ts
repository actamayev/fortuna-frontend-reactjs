import _ from "lodash"
import { useEffect } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useDefaultCurrencyListenerUseEffect(): void {
	const personalInfoClass = usePersonalInfoContext()

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent): void => {
			if (
				_.isNull(personalInfoClass) ||
				event.key !== "defaultCurrency" ||
				(event.newValue !== "sol" && event.newValue !== "usd")
			) return
			personalInfoClass.setDefaultCurrency(event.newValue, false)
		}

		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [personalInfoClass])
}
