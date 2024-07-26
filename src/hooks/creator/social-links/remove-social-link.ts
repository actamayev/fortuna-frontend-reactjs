import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"
import convertSocialLinkToProperCasing from "../../../utils/convert-social-link-to-proper-casing"

export default function useRemoveSocialLink(): (
	socialPlatform: SocialPlatformKey,
	setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		socialPlatform: SocialPlatformKey,
		setTempSocialLinks: React.Dispatch<React.SetStateAction<SocialPlatformLinks[]>>
	): Promise<void> => {
		try {
			if (creatorClass.socialPlatformLinks.some(link => link.socialPlatform === socialPlatform) === false) {
				return
			}

			const response = await fortunaApiClient.creatorDataService.removeSocialPlatformLink(socialPlatform)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			setTempSocialLinks(prevLinks =>
				prevLinks.filter(link => link.socialPlatform !== socialPlatform)
			)
			creatorClass.removeSocialPlatformLink(socialPlatform)
			notificationsClass.setPositiveNotification(`Removed ${convertSocialLinkToProperCasing(socialPlatform)}`)
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				`Unable to remove ${convertSocialLinkToProperCasing(socialPlatform)} link at this time. Please reload page and try again.`
			)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
