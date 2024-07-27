import { useMemo } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useDefaultCurrency (): Currencies {
	const personalInfoClass = usePersonalInfoContext()

	return useMemo(() => {
		return personalInfoClass.defaultCurrency
	}, [personalInfoClass.defaultCurrency])
}
