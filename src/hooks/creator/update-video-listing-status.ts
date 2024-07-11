import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useUpdateVideoListingStatus(): (videoUUID: string) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	const updateVideoListingStatus = useCallback(async (videoUUID: string): Promise<void> => {
		try {
			if (_.isNull(creatorClass)) return

			const response = await fortunaApiClient.creatorDataService.updateVideoListingStatus(videoUUID)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				return
			}

			creatorClass.updateVideoListingStatus(videoUUID)
			notificationsClass.setPositiveNotification("Video Listing status updated")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				"Unable to update video listing status at this time. Please reload page and try again."
			)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])

	return updateVideoListingStatus
}
