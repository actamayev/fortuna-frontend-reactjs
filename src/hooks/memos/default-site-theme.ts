import _ from "lodash"
import { useMemo } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useDefaultSiteTheme (): SiteThemes {
	const personalInfoClass = usePersonalInfoContext()

	const defaultSiteTheme = useMemo(() => {
		if (_.isNull(personalInfoClass)) return "light"
		return personalInfoClass.defaultSiteTheme
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass, personalInfoClass?.defaultSiteTheme])

	return defaultSiteTheme
}
