import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../../utils/type-checks"
import { useCreatorContext } from "../../../contexts/creator-context"
import { useNotificationsContext } from "../../../contexts/notifications-context"
import { useApiClientContext } from "../../../contexts/fortuna-api-client-context"

export default function useFeatureVideo(): (
	videoIdToFeature: number
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		videoIdToFeature: number
	): Promise<void> => {
		try {
			const response = await fortunaApiClient.creatorDataService.featureVideo(videoIdToFeature, creatorClass.featuredContentId)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				return
			}

			creatorClass.featureVideoAndUnfeatureVideo(videoIdToFeature)
			notificationsClass.setPositiveNotification("Featured Video Updated")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to update featured video at this time. Please reload page and try again.")
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
