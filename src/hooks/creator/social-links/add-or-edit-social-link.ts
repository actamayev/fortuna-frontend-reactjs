import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"

export default function useAddOrEditSocialLink(): (
	socialLink: string,
	socialPlatform: SocialPlatformKey,
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	const addOrEditSocialLink = useCallback(async (
		socialLink: string,
		socialPlatform: SocialPlatformKey,
	): Promise<void> => {
		if (_.isNull(creatorClass)) return
		try {
			if (_.isEmpty(socialLink.trim())) return

			const response = await fortunaApiClient.creatorDataService.addOrEditSocialPlatformLink(
				socialLink, socialPlatform
			)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				creatorClass.removeSocialPlatformLink(socialPlatform)
			}
			notificationsClass.setPositiveNotification(`Saved ${_.upperFirst(socialPlatform)} link`)
		} catch (error) {
			console.error(error)
			creatorClass.removeSocialPlatformLink(socialPlatform)
			notificationsClass.setNegativeNotification(
				`Unable to add ${_.upperFirst(socialPlatform)} link at this time. Please reload page and try again.`
			)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])

	return addOrEditSocialLink
}
