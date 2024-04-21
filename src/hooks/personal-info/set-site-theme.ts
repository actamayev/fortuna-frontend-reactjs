import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetSiteTheme(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const setSiteTheme = useCallback(async () => {
		try {
			if (_.isNull(personalInfoClass)) return
			const newSiteTheme = personalInfoClass.siteTheme === "light" ? "dark" : "light"
			personalInfoClass.setSiteTheme(newSiteTheme)
			if (!_.isNull(fortunaApiClient.httpClient.accessToken)) {
				const siteThemeResponse = await fortunaApiClient.personalInfoDataService.setSiteTheme(newSiteTheme)
				if (!_.isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
					throw Error("Unable to save new default site theme")
				}
			}
		} catch (error) {
			console.error(error)
		}
	}, [fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService, personalInfoClass])

	return setSiteTheme
}
