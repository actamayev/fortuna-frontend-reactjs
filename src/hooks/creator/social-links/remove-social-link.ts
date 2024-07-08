import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useRemoveSocialLink(): (
	socialPlatform: SocialPlatformKey,
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	const removeSocialLink = useCallback(async (
		socialPlatform: SocialPlatformKey,
		setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
	): Promise<void> => {
		try {
			setTempSocialLinks(prevLinks =>
				prevLinks.filter(link => link.socialPlatform !== socialPlatform)
			)

			if (
				_.isNull(creatorClass) ||
				creatorClass.socialPlatformLinks.some(link => link.socialPlatform === socialPlatform) === false
			) return

			const response = await fortunaApiClient.creatorDataService.removeSocialPlatformLink(socialPlatform)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.removeSocialPlatformLink(socialPlatform)
			notificationsClass.setPositiveNotification(`Removed ${_.upperFirst(socialPlatform)}`)
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				`Unable to remove ${_.upperFirst(socialPlatform)} link at this time. Please reload page and try again.`
			)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])

	return removeSocialLink
}
