import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useSetDefaultSiteTheme(): () => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async () => {
		try {
			const newSiteTheme = personalInfoClass.defaultSiteTheme === "light" ? "dark" : "light"
			personalInfoClass.setDefaultSiteTheme(newSiteTheme)
			if (!_.isNull(fortunaApiClient.httpClient.accessToken)) {
				const siteThemeResponse = await fortunaApiClient.personalInfoDataService.setDefaultSiteTheme(newSiteTheme)
				if (!_.isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
					throw Error("Unable to save new default site theme")
				}
			}
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				"Unable to change site theme at this time. Please reload page and try again."
			)
		}
	}, [personalInfoClass, fortunaApiClient.httpClient.accessToken, fortunaApiClient.personalInfoDataService, notificationsClass])
}
