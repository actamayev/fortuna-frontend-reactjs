import _ from "lodash"
import { useMemo } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useDefaultCurrency (): Currencies {
	const personalInfoClass = usePersonalInfoContext()

	return useMemo(() => {
		if (_.isNull(personalInfoClass)) return "usd"
		return personalInfoClass.defaultCurrency
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.defaultCurrency])
}
