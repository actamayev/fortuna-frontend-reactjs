import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useCreatorContext } from "../../contexts/creator-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/fortuna-api-client-context"

export default function useEditVideoDescription(): (
	videoUUID: string,
	videoDescription: string,
	setVideoDescription: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const creatorClass = useCreatorContext()
	const fortunaApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		videoUUID: string,
		videoDescription: string,
		setVideoDescription: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		if (videoDescription.length > 5000) return

		const existingVideo = creatorClass.contextForMyContent(videoUUID)
		if (_.isUndefined(existingVideo) || existingVideo.description === videoDescription) return

		try {
			const response = await fortunaApiClient.creatorDataService.editVideoDescription(videoDescription, videoUUID)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				return
			}

			creatorClass.updateVideoProperty(videoUUID, "description", videoDescription)
			notificationsClass.setPositiveNotification("Video description updated")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification("Unable to edit video description at this time. Please reload page and try again.")
			setVideoDescription(existingVideo.description)
		}
	}, [creatorClass, fortunaApiClient.creatorDataService, notificationsClass])
}
