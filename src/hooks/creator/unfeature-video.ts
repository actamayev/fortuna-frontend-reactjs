import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUnfeatureVideo(): () => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (): Promise<void> => {
		try {
			const featuredContentVideoId = creatorClass.featuredContentId
			if (_.isUndefined(featuredContentVideoId)) return

			const response = await fortunaApiClient.creatorDataService.unfeatureVideo(featuredContentVideoId)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.unfeatureVideo()
			notificationsClass.setPositiveNotification("Video Un-featured")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to update un-feature video at this time. Please reload page and try again.")
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
