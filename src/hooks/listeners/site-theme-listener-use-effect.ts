import _ from "lodash"
import { useEffect } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useSiteThemeListenerUseEffect(): void {
	const personalInfoClass = usePersonalInfoContext()

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent): void => {
			if (
				_.isNull(personalInfoClass) ||
				event.key !== "defaultSiteTheme" ||
				(event.newValue !== "light" && event.newValue !== "dark")
			) return
			personalInfoClass.setDefaultSiteTheme(event.newValue, false)
		}

		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [personalInfoClass])
}
